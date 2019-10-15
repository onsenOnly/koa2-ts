const path = require("path");
// 日志根目录-当前目录
const baseLogPath = path.resolve(__dirname, "./log");

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

module.exports = {
    baseLogPath: baseLogPath,
};