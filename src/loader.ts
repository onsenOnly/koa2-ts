import * as fs from "fs";
import * as Koa from "koa";
import * as Router from "koa-router";
import { BaseContext } from "koa";
import { blueprint } from "./blueprint";

export class Loader {
    router: Router = new Router;
    controller: any = {};
    app: Koa;
    constructor(app: Koa) {
        this.app = app;
    }

    loadConfig() {
        const configDef = __dirname + "/config/config.default.js";
        // process.env.NODE_ENV undefined
        const configEnv = __dirname + (process.env.NODE_ENV === "production" ? "/config/config.pro.js" : "/config/config.dev.js");
        const conf = require(configEnv);
        const confDef = require(configDef);
        const merge = Object.assign({}, conf, confDef);

        Object.defineProperty(this.app, "config", {
            get: () => {
                return merge;
            }
        });
    }

    loadService() {
        const service = fs.readdirSync(__dirname + "/service");
        Object.defineProperty(this.app.context, "service", {
            get() {
                if (!(<any>this)["cache"]) {
                    (<any>this)["cache"] = {};
                }
                const loaded = (<any>this)["cache"];
                if (!loaded["service"]) {
                    loaded["service"] = {};
                    // console.log(service);
                    service.forEach((d) => {
                        const name = d.split(".")[0];
                        if (name !== "baseService") {
                            const mod = require(__dirname + "/service/" + d);
                            // console.log(name);
                            // console.log(mod);
                            loaded["service"][name] = new mod(this);
                        }
                    });
                    return loaded.service;
                }
                return loaded.service;
            }
        });
    }

    loadController() {
        const dirs = fs.readdirSync(__dirname + "/controller");
        dirs.forEach((filename) => {
            require(__dirname + "/controller/" + filename).default;
        });

        // dirs.forEach((filename) => {
        //     const property = filename.split(".")[0];
        //     const mod = require(__dirname + "/controller/" + filename).default;
        //     if (mod) {
        //         // constructor
        //         // user
        //         // userInfo
        //         const methodNames = Object.getOwnPropertyNames(mod.prototype).filter((names) => {
        //             if (names !== "constructor") {
        //                 return names;
        //             }
        //         });

        //         // Object.defineProperty(obj, prop, descriptor)
        //         // property即：controller中default定义模块的命名，作为新定义的属性。
        //         // this.controller即：app中new的loader对象的controller对象。
        //         Object.defineProperty(this.controller, property, {
        //             get() {
        //                 const merge: { [key: string]: any } = {};
        //                 methodNames.forEach((name) => {
        //                     merge[name] = {
        //                         type: mod,
        //                         methodName: name
        //                     }
        //                 })
        //                 return merge;
        //             }
        //         });
        //     }
        // });
    }

    loadRouter() {
        this.loadController();
        this.loadService();
        this.loadConfig();
        // const mod = require(__dirname + "/routers.js");
        // const routers = mod(this.controller);//初始化routers.ts中的路由配置
        // { "get /": { type: [Function: User], methodName: "user" },
        //   "get /userinfo": { type: [Function: User], methodName: "userInfo" } }
        // Object.keys(routers).forEach((key) => {
        //     const [method, path] = key.split(" ");
        //     (<any>this.router)[method](path, async (ctx: BaseContext) => {
        //         const _class = routers[key].type;
        //         const handler = routers[key].methodName;
        //         const instance = new _class(ctx);
        //         instance[handler]();
        //     })
        // })
        // return this.router.routes();
        const r = blueprint.getRoute();
        Object.keys(r).forEach((url) => {
            r[url].forEach((object) => {
                (<any>this.router)[object.httpMethod](url, async (ctx: BaseContext) => {
                    const instance = new object.constructor(ctx, this.app);
                    await instance[object.handler]();
                });
            });
        });
        return this.router.routes();
    }
}