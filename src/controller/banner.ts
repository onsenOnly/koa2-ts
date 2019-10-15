import { Controller } from "./base";
import { blueprint } from "../blueprint";
// user.ts

export default class Banner extends Controller {
    @blueprint.get("/getBanners")
    async getBanners() {
        try {
            const banners = await this.ctx.service.bannerService.findBanners();
            this.ctx.body = banners;
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
        }
    }
    @blueprint.post("/deleteBanner")
    async deleteBanner() {
        console.info(this.ctx.request.body);
        try {
            console.info(this.ctx.request.body);
            if (!this.ctx.request.body) {
                this.ctx.body = { msg: "name is null", code: 10404 };
                return;
            }
            await this.ctx.service.bannerService.deleteBanner(this.ctx.request.body.name);
            this.ctx.body = { msg: "delete ok", code: 200 };
            return;
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
            return;
        }
    }
    @blueprint.post("/uploadBanner")
    async uploadBanner() {
        try {
            if (!this.ctx.req.files || this.ctx.req.files.length == 0) {
                this.ctx.status = 503;
                return;
            }
            const files = this.ctx.req.files;
            const dataArr = [];
            // 实际的多张图片的上传是请求多次接口，而不是一次请求多个data的数据，ant design
            for (const file of files) {
                const readData = await this.ctx.service.bannerService.readUpload(file.path);
                const writeData = await this.ctx.service.bannerService.writeUpload(readData, file.filename);
                dataArr.push(writeData);
            }
            for (const data of dataArr) {
                await this.ctx.service.bannerService.createBanner(data.url, data.name);
            }
            this.ctx.body = { data: dataArr, code: 200 };
        } catch (err) {
            console.error(err);
            this.ctx.status = 500;
        }
    }
}