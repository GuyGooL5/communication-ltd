"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
if (dotenv_1.default.config().error) {
    console.error("DOT ENV FILE NOT FOUND, EXITING!");
    (0, process_1.exit)(-1);
}
exports.default = process.env;
