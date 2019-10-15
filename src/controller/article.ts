import { Controller } from "./base";
import { blueprint } from "../blueprint";
// user.ts

export default class Article extends Controller {
    @blueprint.post("/getArticles")
    async getArticles() {
        try {
            const articles = await this.ctx.service.articleService.findArticles();
            this.ctx.body = articles;
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
        }
    }
    @blueprint.post("/postArticle")
    async postArticle() {
        try {
            if (!this.ctx.request.body) {
                this.ctx.body = { msg: "body is null", code: 10404 };
                return;
            }
            if (!this.ctx.request.body.status || !this.ctx.request.body.title || !this.ctx.request.body.abstract
                || !this.ctx.request.body.content || !this.ctx.request.body.classification) {
                this.ctx.body = { msg: "params is null", code: 10404 };
                return;
            }
            const id = this.ctx.request.body.id;
            const status = this.ctx.request.body.status;
            const title = this.ctx.request.body.title;
            const abstract = this.ctx.request.body.abstract;
            const content = this.ctx.request.body.content;
            const classification = this.ctx.request.body.classification;
            const titleMap = this.ctx.request.body.titleMap;
            await this.ctx.service.articleService.operateArticle(id, status, title, content, classification, titleMap, abstract);
            this.ctx.body = status == 1 ? "发布成功" : status == 2 ? "保存成功" : status == 3 ? "删除成功" : "操作失败";
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
        }
    }
    @blueprint.post("/uploadArticle")
    async uploadArticle() {
        try {
            if (!this.ctx.req.files || this.ctx.req.files.length == 0) {
                this.ctx.status = 503;
                return;
            }
            const files = this.ctx.req.files;
            const dataArr = [];
            // 实际的多张图片的上传是请求多次接口，而不是一次请求多个data的数据，ant design
            for (const file of files) {
                const readData = await this.ctx.service.articleService.readUpload(file.path);
                const writeData = await this.ctx.service.articleService.writeUpload(readData, file.filename);
                dataArr.push(writeData);
            }
            this.ctx.body = { data: dataArr, code: 200 };
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
        }
    }
}