"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const fs_1 = require("fs");
const appConfig_1 = __importDefault(require("./config/appConfig"));
const cors_1 = __importDefault(require("cors"));
const PORT = 5000;
const CLIENT_DIST = path_1.default.join(__dirname, "..", "client", "dist");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(CLIENT_DIST));
app.use("/api", routes_1.default);
app.use("*", (req, res) => res.sendFile(path_1.default.resolve(CLIENT_DIST, "index.html")));
const httpServer = () => {
    app.listen(process.env.PORT || PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
};
const httpsServer = () => {
    https_1.default.createServer({
        key: (0, fs_1.readFileSync)(path_1.default.join(__dirname, "..", "key.pem")),
        cert: (0, fs_1.readFileSync)(path_1.default.join(__dirname, "..", "cert.pem")),
        passphrase: appConfig_1.default.sslPassphrase
    }, app).listen(process.env.PORT || PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
};
const startServer = process.env.NODE_ENV === "production" ? httpServer : httpsServer;
startServer();
