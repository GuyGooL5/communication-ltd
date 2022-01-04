import { DBResult, StoredProcedureInput, StoredProcedureOutput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";

interface GenerateTokenResult {
  Token: number;
}

async function generateToken(email: string, expiration: Date):
  Promise<DBResult<GenerateTokenResult>> {
  const inputs: StoredProcedureInput[] = [
    ["email", mssql.NVarChar(50), email],
    ["expiration", mssql.DateTime(), expiration]

  ];
  const result = await storedProcedure("GenerateToken", inputs);
  return { success: !!result.returnValue, data: result.recordset[0] };
}

export default generateToken;