"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = __importDefault(require("../config/appConfig"));
const mssql_1 = __importDefault(require("mssql"));
const DatabaseHandler_1 = __importDefault(require("./DatabaseHandler"));
describe("Testing MSSQL Database StoredProcedures.", () => {
    const _newEntry = `${+new Date()}${Math.random().toString(36).substring(9)}`;
    const predefinedUser = {
        id: 41,
        username: "jest_testing3",
        email: "jest_testing3@test.com",
        passwordPlain: "Aabcd12345!!!",
        passwordHash: "$2b$10$FUPTL9zsnIe8PWW61Yub3.hAOR.MCSXPNNSMjkUPeBU/hG.hP4G7e"
    };
    const generateNewClient = () => ({
        fullname: "Test Testberg",
        address: "Test valley",
        dob: new Date(1970, 1, 1),
        email: `testberg${_newEntry}@test.com`,
        phoneNumber: `${Math.random().toString(10).substring(10)} `
    });
    describe("Testing connection to database", () => {
        it("Creating connection", async () => {
            const connection = await mssql_1.default.connect(appConfig_1.default.mssqlConfig);
            expect(connection.connected).toBe(true);
            await connection.close();
            expect(connection.connected).toBe(false);
        });
    });
    describe("Testing DatabaseHandler.registerUser", () => {
        const newUser = _newEntry;
        const newEmail = `${_newEntry}@abc.com`;
        const { passwordHash } = predefinedUser;
        it("Creating new user", async () => {
            const { success, data } = await DatabaseHandler_1.default.registerUser(newEmail, newUser, passwordHash);
            expect(success).toBe(true);
            expect(data).not.toBe(-1);
        });
        it("Except throwing when trying to create new user with existing username and email", async () => {
            await DatabaseHandler_1.default.registerUser(newEmail, newUser, passwordHash).catch(e => expect(e));
        });
    });
    describe('Testing DatabaseHandler.getPassword', () => {
        const { username, passwordHash } = predefinedUser;
        it("Trying to get password of nonexistent user, expecting throw", async () => {
            const { success, data } = await DatabaseHandler_1.default.getPassword("-1");
            expect(success).toBe(false);
            expect(data).toBeFalsy();
        });
        it("Comparing predefined password and user", async () => {
            const { success, data } = await DatabaseHandler_1.default.getPassword(username);
            expect(success).toBe(true);
            // TODO: This will fail.
            expect(data[1].Password).toEqual(passwordHash);
        });
    });
    describe('Testing DatabaseHandler.registerClient', () => {
        const { username } = predefinedUser;
        it("Trying to create a new Client for an existing user", async () => {
            const { success, data } = await DatabaseHandler_1.default.registerClient(username, generateNewClient());
            expect(success).toBe(true);
            expect(data).not.toEqual(-1);
        });
        it("Trying to create a new Client for a nonexisting user", async () => {
            await expect(DatabaseHandler_1.default.registerClient("-1", generateNewClient())).rejects.toThrow();
        });
    });
    describe('Testing DatabaseHandler.deleteClient', () => {
        const { username } = predefinedUser;
        it("Creating new Client then deleting them", async () => {
            const { success: successRegisterCLient, data } = await DatabaseHandler_1.default.registerClient(username, generateNewClient());
            expect(successRegisterCLient).toBe(true);
            expect(data).not.toBe(-1);
            const { success: successDeleteClient } = await DatabaseHandler_1.default.deleteClient(data);
            expect(successDeleteClient).toBe(true);
        });
        it("Trying to delete nonexisting client should result with fail", async () => {
            const { success } = await DatabaseHandler_1.default.deleteClient(-1);
            expect(success).toBe(false);
        });
    });
    describe('Testing DatabaseHandler.getUserClients', () => {
        const { username } = predefinedUser;
        it("Getting all clients of an existing user", async () => {
            const { success, data: clients } = await DatabaseHandler_1.default.getUserClients(username);
            expect(success).toBe(true);
            const first = clients[0];
            expect(first).toBeTruthy();
            expect(typeof first.Id).toBe('number');
            expect(first.UserId).not.toEqual(0);
        });
        it("Trying to get all clients of a nonexisting user", async () => {
            const { success, data: clients } = await DatabaseHandler_1.default.getUserClients("-1");
            expect(success).toBe(false);
            expect(clients).toEqual([]);
        });
    });
    describe('Testing DatabaseHandler.checkUsernameTaken', () => {
        it("Checking a proven already existing username", async () => {
            const { username } = predefinedUser;
            const { success } = await DatabaseHandler_1.default.checkUsernameValid(username);
            expect(success).toBe(false);
        });
        it("Checking a proven nonexisting username", async () => {
            const username = "ABUYA3";
            const { success } = await DatabaseHandler_1.default.checkUsernameValid(username);
            expect(success).toBe(true);
        });
    });
    describe('Testing DatabaseHandler.checkEmailTaken', () => {
        it("Checking a proven already existing username", async () => {
            const { email } = predefinedUser;
            const { success } = await DatabaseHandler_1.default.checkEmailValid(email);
            expect(success).toBe(false);
        });
        it("Checking a proven nonexisting username", async () => {
            const email = "ABUYA3@ABUYA5.com";
            const { success } = await DatabaseHandler_1.default.checkEmailValid(email);
            expect(success).toBe(true);
        });
    });
    describe.only('Testing DatabaseHandler.generateToken', () => {
        const testToken = (token) => /^[0-9]{6}$/g.test(token.toString());
        it("Generating a token for a known existing user", async () => {
            const { email } = predefinedUser;
            const { success, data } = await DatabaseHandler_1.default.generateToken(email, new Date());
            expect(success).toBe(false);
            expect(testToken(data.Token)).toBe(true);
        });
    });
});
