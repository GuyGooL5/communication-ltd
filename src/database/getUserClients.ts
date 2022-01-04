import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";
import { DBClientData } from "@app/types/interfaces";


async function getUserClients(username: string):
    Promise<DBResult<DBClientData[]>> {
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username]];
    const result = await storedProcedure("GetUserClients", inputs);
    return {
        success: !!result.returnValue,
        data: result.recordset
    };
}


export default getUserClients;