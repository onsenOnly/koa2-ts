import { BaseService } from "./baseService";
const path = require("path");
import * as fs from "fs";
import * as moment from "moment";
import { BannerModel, BannerDocument } from "../model/banner";

const staticPath: string = path.resolve(__dirname, "../static");

class BannerService extends BaseService {
    findBanners() {
        return new Promise(function (resolve, reject) {
            BannerModel.find({}, function (err: any, data: BannerDocument) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    readUpload(path: string) {
        return new Promise(function (resolve, reject) {
            fs.readFile(path, function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    writeUpload(data: any, fileName: string) {
        return new Promise(function (resolve, reject) {
            const date = moment(Date.now()).format("_YYYYMMDDHHmmss");
            const picName = "banner" + fileName + date + ".jpg"; // 暂时默认覆盖和.jpg结尾
            const url = "/banner/" + picName; // 暂时默认覆盖和.jpg结尾
            const des_file = staticPath + url;
            fs.writeFile(des_file, data, function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve({ url: url, name: picName });
            });
        });
    }
    createBanner(url: string, name: string) {
        return new Promise(function (resolve, reject) {
            BannerModel.create({ url: url, name: name }, function (err: any, data: BannerDocument) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    deleteBanner(name: string) {
        return new Promise(function (resolve, reject) {
            BannerModel.remove({ name: name }, function (err: any) {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }
}

module.exports = BannerService;