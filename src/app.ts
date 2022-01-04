import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser'
import router from './routes';
import path from 'path';
import https from 'https'
import { readFileSync } from 'fs';
import appConfig from './config/appConfig';
import cors from 'cors';
import { jsonPayload } from './utils/payloads';
const PORT = 5000;
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist")

const app = express();

app.use(cors())
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(CLIENT_DIST));
app.use("/api", router);

app.use("*", (req, res) => res.sendFile(path.resolve(CLIENT_DIST, "index.html")));



const httpServer = () => {
    app.listen(process.env.PORT || PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
}

const httpsServer = () => {
    https.createServer({
        key: readFileSync(path.join(__dirname, "..", "key.pem")),
        cert: readFileSync(path.join(__dirname, "..", "cert.pem")),
        passphrase: appConfig.sslPassphrase
    }, app).listen(process.env.PORT || PORT, () => {
        console.log(`server started on port ${PORT}`);
    })
}

const startServer = process.env.NODE_ENV === "production" ? httpServer : httpsServer;

startServer();
