import { DBResult, StoredProcedureInput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";

interface GetEmailResult {
  Email: number;
}

async function getEmail(username: string):
  Promise<DBResult<GetEmailResult>> {
  const inputs: StoredProcedureInput[] = [
    ["username", mssql.NVarChar(50), username],
  ];
  const result = await storedProcedure("GetEmail", inputs);
  console.log(result);
  return { success: !!result.returnValue, data: result.recordset[0] };
}

export default getEmail;