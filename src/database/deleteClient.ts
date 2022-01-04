import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";


async function deleteClient(clientID: number):
    Promise<DBResult<undefined>> {
    const inputs: StoredProcedureInput[] = [
        ["id", mssql.Int, clientID]];
    const result = await storedProcedure("DeleteClient", inputs);
    return { success: !!result.returnValue, data: undefined };
}

export default deleteClient;