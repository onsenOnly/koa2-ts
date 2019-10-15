import { BaseContext } from "koa";
import * as Koa from "koa";

export class BaseService {
    ctx: BaseContext;
    app: Koa;
    constructor(ctx: BaseContext, app: Koa) {
        this.ctx = ctx;
        this.app = app;
    }
}