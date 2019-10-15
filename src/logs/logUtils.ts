import * as log4js from "log4js";
import logConfig from "./logConfig";

log4js.configure(logConfig);


// const logger1 = log4js.getLogger();

// logger1.info("测试1");

// const resLogger = log4js.getLogger("resLogger");

// resLogger.info("测试2");

// const runLogger = log4js.getLogger("runLogger");

// runLogger.error("测试3");

// const errorLogger = log4js.getLogger("errorLogger");

// errorLogger.error("测试4");
// 格式化请求日志
function formatReqLog(req: any, resTime: Number): String {

    let logText: String = new String();

    const method = req.method;
    // 访问方法
    logText += "request method: " + method + "\n";

    // 请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";

    // 客户端ip
    logText += "request client ip:  " + req.ip + "\n";
    // 请求参数
    if (method === "GET") {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
    }
    // 服务器响应时间
    logText += "response time: " + resTime + "\n";

    return logText;
}

function formatRes(ctx: any, resTime: Number) {
    let logText = new String();

    // 响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime).toString();

    // 响应状态码
    logText += "response status: " + ctx.status + "\n";

    // 响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    // 响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;
}

// 格式化错误日志
const formatError = function (ctx: any, err: any, resTime: Number) {
    let logText = new String();

    // 错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime).toString();

    // 错误名称
    logText += "err name: " + err.name + "\n";
    // 错误信息
    logText += "err message: " + err.message + "\n";
    // 错误详情
    logText += "err stack: " + err.stack + "\n";

    // 错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};



export function runLogger() {
    return log4js.getLogger("runLogger");
}

export function errorLogger(ctx: any, error: any, resTime: Number) {
    return log4js.getLogger("errorLogger").error(formatError(ctx, error, resTime));
}

export function responseLogger(ctx: any, resTime: Number) {
    return log4js.getLogger("resLogger").info(formatRes(ctx, resTime));
}

