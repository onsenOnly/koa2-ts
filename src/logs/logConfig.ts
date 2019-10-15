const path = require("path");
// 日志根目录-当前目录
const baseLogPath: string = path.resolve(__dirname, "");

// 错误日志目录
const errorPath = "/error";
// 错误日志文件名
const errorFileName = "error";
// 错误日志输出完整路径
const errorLogPath = baseLogPath + errorPath + "/" + errorFileName;

// 响应日志目录
const responsePath = "/response";
// 响应日志文件名
const responseFileName = "response";
// 响应日志输出完整路径
const responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

// 响应日志目录
const runPath = "/run";
// 响应日志文件名
const runFileName = "run";
// 响应日志输出完整路径
const runLogPath = baseLogPath + runPath + "/" + runFileName;

export default {
    appenders: {
        out: { type: "console" },
        errorLogger: {
            type: "dateFile",
            filename: errorLogPath,
            pattern: "-yyyy-MM-dd-dd.log",
            alwaysIncludePattern: true
        },
        resLogger: {
            type: "dateFile",
            filename: responseLogPath,
            pattern: "-yyyy-MM-dd-dd.log",
            alwaysIncludePattern: true
        },
        runLogger: {
            type: "dateFile",
            filename: runLogPath,
            pattern: "-yyyy-MM-dd-dd.log",
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ["out"], level: "info" },
        errorLogger: { appenders: ["out", "errorLogger"], level: "info" },
        resLogger: { appenders: ["out", "resLogger"], level: "info" },
        runLogger: { appenders: ["out", "runLogger"], level: "info" },
    }
};