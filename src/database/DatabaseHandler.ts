import appConfig from "@app/config/appConfig";
import { ClientData, DBClientData } from "@app/types/interfaces";
import mssql, { Request } from "mssql";
import checkEmailValid from "./checkEmailValid";
import checkUsernameValid from "./checkUsernameValid";
import deleteClient from "./deleteClient";
import deleteToken from "./deleteToken";
import generateToken from "./generateToken";
import getEmail from "./getEmail";
import getPassword from "./getPassword";
import getToken from "./getToken";
import getUserClients from "./getUserClients";
import getUsername from "./getUsername";
import registerClient from "./registerClient";
import registerUser from "./registerUser";
import updatePassword from "./updatePassword";

const connect = async () => mssql.connect(appConfig.mssqlConfig);

export type StoredProcedureInput = Parameters<Request["input"]>;
export type StoredProcedureOutput = Parameters<Request["output"]>;

export type DBResult<T> = {
    success: boolean;
    data?: T;
};


export async function storedProcedure(procedure: string, inputs: StoredProcedureInput[], outputs?: StoredProcedureOutput[]) {

    const connection = await connect();

    const request = new Request(connection);
    inputs.forEach(input => request.input(...input));
    if (outputs) outputs.forEach(output => request.output(...output));


    try {
        return await request.execute(procedure);
    } finally {
        connection.close();
    }
}







const DatabaseHandler = {
    updatePassword,
    deleteClient,
    generateToken,
    getUserClients,
    getUsername,
    getPassword,
    getToken,
    getEmail,
    registerUser,
    registerClient,
    deleteToken,
    checkUsernameValid,
    checkEmailValid,
}

export default DatabaseHandler;