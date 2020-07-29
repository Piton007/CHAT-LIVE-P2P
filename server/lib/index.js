"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var socket = new socket_io_1.default();
socket.on("connection", function (socket) {
    socket.on("chat-message", function (message) {
        socket.broadcast.emit("chat-message", message);
    });
});
var app = express_1.default();
app.use(cors_1.default());
var server = http_1.createServer(app);
socket.listen(server);
server.listen(3000);
//# sourceMappingURL=index.js.map