import { Controller } from "./base";
import { blueprint } from "../blueprint";
// user.ts

export default class Banner extends Controller {
    @blueprint.get("/getClassifications")
    async getClassifications() {
        try {
            const classifications = await this.ctx.service.classificationService.findClassifications();
            this.ctx.body = classifications;
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
        }
    }
    @blueprint.post("/deleteClassification")
    async deleteClassification() {
        try {
            if (!this.ctx.request.body || this.ctx.request.body.name) {
                this.ctx.body = { msg: "body is null", code: 10404 };
                return;
            }
            if (this.ctx.request.body.name) {
                this.ctx.body = { msg: "params is null", code: 10404 };
                return;
            }
            await this.ctx.service.classificationService.deleteClassification(this.ctx.request.body.name);
            this.ctx.body = { msg: "delete ok", code: 200 };
            return;
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
            return;
        }
    }
    @blueprint.post("/postClassification")
    async postClassification() {
        try {
            if (!this.ctx.request.body) {
                this.ctx.body = { msg: "body is null", code: 10404 };
                return;
            }
            if (!this.ctx.request.body.name || !this.ctx.request.body.url) {
                this.ctx.body = { msg: "body is null", code: 10404 };
                return;
            }
            const classification = await this.ctx.service.classificationService.createClassification(this.ctx.request.body.name, this.ctx.request.body.url, this.ctx.request.body.id);
            this.ctx.body = { msg: "post ok", code: 200, data: classification };
            return;
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
            return;
        }
    }
    @blueprint.post("/uploadClassification")
    async uploadClassification() {
        try {
            if (!this.ctx.req.files || this.ctx.req.files.length == 0) {
                this.ctx.status = 503;
                return;
            }
            const files = this.ctx.req.files;
            const dataArr = [];
            // 实际的多张图片的上传是请求多次接口，而不是一次请求多个data的数据，ant design
            for (const file of files) {
                const readData = await this.ctx.service.classificationService.readUpload(file.path);
                const writeData = await this.ctx.service.classificationService.writeUpload(readData, file.filename);
                dataArr.push(writeData);
            }
            this.ctx.body = { data: dataArr, code: 200 };
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
        }
    }
}