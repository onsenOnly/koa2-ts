import app from "./app";

const http = require("http");

// const fs = require("fs");

// const logConfig = require("./log/logConfig");

// /**
//  * 确定目录是否存在，如果不存在则创建目录
//  */
// const confirmPath = function (pathStr: String) {
//     if (!fs.existsSync(pathStr)) {
//         fs.mkdirSync(pathStr);
//         console.log("createPath: " + pathStr);
//     }
// };

// /**
//  * 初始化log相关目录
//  */
// const initLogPath = function () {
//     // 创建log的根目录"logs"
//     if (logConfig.baseLogPath) {
//         confirmPath(logConfig.baseLogPath);
//         for (const key in logConfig.appenders) {
//             if (logConfig.appenders[key].path) {
//                 confirmPath(logConfig.baseLogPath + logConfig.appenders[key].path);
//             }
//         }
//     }
// };

// initLogPath();

const port = normalizePort("3000");

function normalizePort(val: string) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    console.log("Listening on " + bind);
}

const server = http.createServer(app.callback());
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);