import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";
import { ClientData } from "@app/types/interfaces";

async function registerClient(username: string, data: ClientData):
    Promise<DBResult<number>> {

    const { fullname, address, dob, email, phoneNumber } = data;
    const inputs: StoredProcedureInput[] = [
        ["username", mssql.NVarChar(50), username],
        ["fullname", mssql.NVarChar(50), fullname],
        ["dateofbirth", mssql.Date(), dob],
        ["email", mssql.NVarChar(50), email],
        ["phonenumber", mssql.NVarChar(50), phoneNumber],
        ["address", mssql.NVarChar(50), address]
    ]

    const outputs: StoredProcedureOutput[] = [
        ["id", mssql.Int]
    ];

    const result = await storedProcedure("RegisterClient", inputs, outputs);
    return {
        success: !!result.returnValue,
        data: result.output.id
    }

}


export default registerClient;