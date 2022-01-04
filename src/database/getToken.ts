import { DBResult, StoredProcedureInput, storedProcedure } from "./DatabaseHandler";
import mssql from "mssql";

interface GetTokenResult {
  Token: number;
  Expiration: Date;
}

async function getToken(email: string):
  Promise<DBResult<GetTokenResult>> {
  const inputs: StoredProcedureInput[] = [
    ["email", mssql.NVarChar(50), email],
  ];
  const result = await storedProcedure("GetToken", inputs);

  const { Token, Expiration } = result.recordset[0];
  return { success: !!result.returnValue, data: { Token, Expiration: new Date(Expiration) } };
}

export default getToken;