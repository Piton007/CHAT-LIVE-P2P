"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = require("http");
var app_1 = __importDefault(require("./app"));
var users = new Map();
function toJson(users) {
    var json = [];
    users.forEach(function (value, key) {
        json.push({ id: key, value: value });
    });
    return json;
}
var masterId = "";
var io = new socket_io_1.default();
io.on("connection", function (socket) {
    socket.on("joined-in-class", function (room) {
        socket.join(room);
        socket.emit("master-id", masterId);
    });
    socket.on("start-class", function (id) {
        masterId = id;
    });
    socket.on("joined", function (partner) {
        socket.emit("shaked", toJson(users));
        users.set(socket.id, partner);
        socket.broadcast.emit("joined", { id: socket.id, value: partner });
    });
    socket.on("notification", function (notification) {
        socket.broadcast.emit("notification", notification);
    });
    socket.on("chat-message", function (message) {
        var user = users.get(socket.id);
        socket.broadcast.emit("chat-message", __assign({ avatar: (user === null || user === void 0 ? void 0 : user.avatar) || "" }, message));
    });
    socket.on("disconnect", function () {
        socket.broadcast.emit("user-disconnected", socket.id);
        users.delete(socket.id);
    });
});
var app = new app_1.default("D:\Projects\WspFake\client\dist");
var server = http_1.createServer(app.getServer());
io.listen(server);
server.listen(3000);
//# sourceMappingURL=index.js.map