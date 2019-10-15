import * as Koa from "koa";
const path = require("path");
import { Loader } from "./loader";
import { errorLogger, responseLogger } from "./logs/logUtils";
import * as mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/order").then(
    () => {console.info("mongodb connect ok!"); },
).catch(err => {
    console.error("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

const app = new Koa;

import convert = require("koa-convert");
import bodyParser = require("koa-bodyparser");
import cors = require("koa-cors");
import multer = require("koa-multer");
import koaStatic = require("koa-static");
// 跨域
app.use(convert(cors()));
// 配置ctx.body解析中间件
app.use(convert(bodyParser()));
// 多媒体
app.use(convert(multer({ dest: "/tmp/" }).array("file")));

app.use(koaStatic(
    path.join(__dirname, "./static")
));

app.use(async (ctx, next) => {
    // 响应开始时间
    const start: Number = new Date().getTime();
    // 响应间隔时间
    let ms: Number;
    try {
        // 开始进入到下一个中间件
        await next();
        ms = (new Date().getTime()) - Number(start);
        responseLogger(ctx, ms);
    } catch (error) {
        ms = (new Date().getTime()) - Number(start);
        errorLogger(ctx, error, ms);
    }
});


const loader = new Loader(app); // 注意这里将app实例，传给loader

app.use(loader.loadRouter());

export default app;
