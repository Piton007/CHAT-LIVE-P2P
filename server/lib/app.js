"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var body_parser_1 = __importDefault(require("body-parser"));
var fileUpload_1 = __importDefault(require("./fileUpload"));
var path_1 = __importDefault(require("path"));
var ExpressApp = /** @class */ (function () {
    function ExpressApp(frontEndPath) {
        if (frontEndPath === void 0) { frontEndPath = ""; }
        this.app = express_1.default();
        this.setUpCors();
        this.setUpBodyParser();
        this.setUpUploadMiddleware();
        this.buildRoutes();
        this.setUpStaticFiles();
        this.frontEndPath = frontEndPath;
    }
    ExpressApp.prototype.setUpCors = function () {
        this.app.use(cors_1.default());
    };
    ExpressApp.prototype.setUpStaticFiles = function () {
        this.app.use(express_1.static('uploads'));
    };
    ExpressApp.prototype.setUpUploadMiddleware = function () {
        this.app.use(express_fileupload_1.default({
            createParentPath: true
        }));
    };
    ExpressApp.prototype.setUpBodyParser = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    };
    ExpressApp.prototype.getServer = function () {
        return this.app;
    };
    ExpressApp.prototype.buildRoutes = function () {
        var self = this;
        self.app.post('/upload-avatar', fileUpload_1.default);
        if (!!self.frontEndPath) {
            console.log(this.frontEndPath);
            self.app.get("*", function (req, res) {
                res.sendfile(path_1.default.join(self.frontEndPath, "index.html"));
            });
        }
    };
    return ExpressApp;
}());
exports.default = ExpressApp;
//# sourceMappingURL=app.js.map