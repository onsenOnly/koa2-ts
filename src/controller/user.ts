import { Controller } from "./base";
import { blueprint } from "../blueprint";
// user.ts

export default class User extends Controller {
    async user() {
        // this.ctx.body = "hello user";
        this.ctx.body = this.ctx.service.userService.index(); // 注意看这里
    }
    @blueprint.get("/test")
    async userInfo() {
        console.info(1111);
        const order = await this.ctx.service.userService.createOder("aaa", "123", "2");
        console.info(order);
        this.ctx.body = "我是装饰器";
    }
}