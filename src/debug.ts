import DatabaseHandler from './database/DatabaseHandler';


const [id, username, email, plainPW, hashPW] = [
    41,
    "jest_testing3",
    "jest_testing3@test.com",
    "Aabcd12345!!!",
    "$2b$10$FUPTL9zsnIe8PWW61Yub3.hAOR.MCSXPNNSMjkUPeBU/hG.hP4G7e"
];

// const result = await DatabaseHandler.getPassword(username).catch(e => e);
// console.log(result);


(async () => {

    const result = await DatabaseHandler.generateToken(email, new Date());
    console.log('generate token result', result);


    const emailReuslt = await DatabaseHandler.getEmail(username);

    console.log('email', emailReuslt);




    if (!result.success) throw new Error("No Success");
    const Token = result.data.Token;

    console.log('Generated token:', Token);


    const useranameResult = await DatabaseHandler.getUsername("-1");
    console.log(useranameResult);

    // const deleteTokenResponse = await DatabaseHandler.deleteToken(email);
    // console.log(deleteTokenResponse);

    // const getTokenResult = await DatabaseHandler.getToken(email);
    // const GetTokenData = getTokenResult.data;
    // console.log('Get token:', GetTokenData);


})();