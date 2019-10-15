import { BaseService } from "./baseService";
const path = require("path");
import { ArticleModel, ArticleDocument } from "../model/article";
import * as fs from "fs";
import * as moment from "moment";
import { Types } from "mongoose";

const staticPath: string = path.resolve(__dirname, "../static");

class ArticleService extends BaseService {
    findArticles() {
        return new Promise(function (resolve, reject) {
            ArticleModel.find({}, function (err: any, data: ArticleDocument) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    operateArticle(id: string, status: number, title: string, content: string, classification: string, titleMap: string, abstract: string) {
        return new Promise(function (resolve, reject) {
            if (!id) {// 创建
                ArticleModel.create({
                    title: title,
                    titleMap: titleMap,
                    abstract: abstract,
                    status: status,
                    content: content,
                    classification: Types.ObjectId(classification)
                }, function (err: any, article: ArticleDocument) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(article);
                });
            } else {// 更新
                ArticleModel.update({ _id: id }, {
                    title: title,
                    titleMap: titleMap,
                    status: status,
                    content: content,
                    updateTime: new Date(),
                    classification: Types.ObjectId(classification)
                }, { multi: false }, function (err: any) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve();
                });
            }
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
            const picName = "article" + fileName + date + ".jpg"; // 暂时默认覆盖和.jpg结尾
            const url = "/article/" + picName; // 暂时默认覆盖和.jpg结尾
            const des_file = staticPath + url;
            fs.writeFile(des_file, data, function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve({ url: url, name: picName });
            });
        });
    }
}

module.exports = ArticleService;