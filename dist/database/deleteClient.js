"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseHandler_1 = require("./DatabaseHandler");
const mssql_1 = __importDefault(require("mssql"));
async function deleteClient(clientID) {
    const inputs = [
        ["id", mssql_1.default.Int, clientID]
    ];
    const result = await (0, DatabaseHandler_1.storedProcedure)("DeleteClient", inputs);
    return { success: !!result.returnValue, data: undefined };
}
exports.default = deleteClient;
