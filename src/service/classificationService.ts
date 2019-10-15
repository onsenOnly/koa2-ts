import { BaseService } from "./baseService";
const path = require("path");
import * as fs from "fs";
import * as moment from "moment";
import { ClassificationModel, ClassificationDocument } from "../model/classification";

const staticPath: string = path.resolve(__dirname, "../static");

class ClassificationService extends BaseService {
    findClassifications() {
        return new Promise(function (resolve, reject) {
            ClassificationModel.find({}, function (err: any, data: ClassificationDocument) {
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
            const picName = "classification" + fileName + date + ".jpg"; // 暂时默认覆盖和.jpg结尾
            const url = "/classification/" + picName; // 暂时默认覆盖和.jpg结尾
            const des_file = staticPath + url;
            fs.writeFile(des_file, data, function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve({ url: url, name: picName });
            });
        });
    }
    createClassification(name: string, url: string, id: string) {
        return new Promise(function (resolve, reject) {
            console.info(!id);
            if (!id) {
                ClassificationModel.create({ name: name, url: url, updateTime: new Date() }, function (err: any, classification: ClassificationDocument) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(classification);
                });
            } else {
                ClassificationModel.findOne({ _id: id }).exec(function (err, classification) {
                    if (err) {
                        return reject(err);
                    }
                    if (!classification) {
                        ClassificationModel.create({ name: name, url: url, updateTime: new Date() }, function (err: any, classification: ClassificationDocument) {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(classification);
                        });
                    } else {
                        ClassificationModel.update({ _id: id }, { name: name, url: url, updateTime: new Date() }, { multi: false }, function (err) {
                            if (err) {
                                return reject(err);
                            }
                            classification.name = name;
                            classification.url = url;
                            return resolve(classification);
                        });
                    }
                });
            }
        });
    }
    deleteClassification(name: string) {
        return new Promise(function (resolve, reject) {
            ClassificationModel.remove({ name: name }, function (err: any) {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }
}

module.exports = ClassificationService;