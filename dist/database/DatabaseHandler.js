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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storedProcedure = void 0;
const appConfig_1 = __importDefault(require("../config/appConfig"));
const mssql_1 = __importStar(require("mssql"));
const checkEmailValid_1 = __importDefault(require("./checkEmailValid"));
const checkUsernameValid_1 = __importDefault(require("./checkUsernameValid"));
const deleteClient_1 = __importDefault(require("./deleteClient"));
const deleteToken_1 = __importDefault(require("./deleteToken"));
const generateToken_1 = __importDefault(require("./generateToken"));
const getEmail_1 = __importDefault(require("./getEmail"));
const getPassword_1 = __importDefault(require("./getPassword"));
const getToken_1 = __importDefault(require("./getToken"));
const getUserClients_1 = __importDefault(require("./getUserClients"));
const getUsername_1 = __importDefault(require("./getUsername"));
const registerClient_1 = __importDefault(require("./registerClient"));
const registerUser_1 = __importDefault(require("./registerUser"));
const updatePassword_1 = __importDefault(require("./updatePassword"));
const connect = async () => mssql_1.default.connect(appConfig_1.default.mssqlConfig);
async function storedProcedure(procedure, inputs, outputs) {
    const connection = await connect();
    const request = new mssql_1.Request(connection);
    inputs.forEach(input => request.input(...input));
    if (outputs)
        outputs.forEach(output => request.output(...output));
    try {
        return await request.execute(procedure);
    }
    finally {
        connection.close();
    }
}
exports.storedProcedure = storedProcedure;
const DatabaseHandler = {
    updatePassword: updatePassword_1.default,
    deleteClient: deleteClient_1.default,
    generateToken: generateToken_1.default,
    getUserClients: getUserClients_1.default,
    getUsername: getUsername_1.default,
    getPassword: getPassword_1.default,
    getToken: getToken_1.default,
    getEmail: getEmail_1.default,
    registerUser: registerUser_1.default,
    registerClient: registerClient_1.default,
    deleteToken: deleteToken_1.default,
    checkUsernameValid: checkUsernameValid_1.default,
    checkEmailValid: checkEmailValid_1.default,
};
exports.default = DatabaseHandler;
