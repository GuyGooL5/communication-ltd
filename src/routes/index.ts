import express, { NextFunction, Request } from 'express'
import authorizationMiddleware from './authorizationMiddleware';
import updatePassword from './updatePassword';
import postLogin from './postLogin';
import postRegister from './postRegister';
import getAuth from './getAuth';
import postClients from './postClients';
import getClients from './getClients';
import getPasswordStrength from './getPasswordStrength';
import postForgotPassword from './postForgotPassword';
import postVerifyOneTimePassword from './postVerifyOneTimePassword';


const router = express.Router();



router.get("/passwordStrength", getPasswordStrength);

router.post("/login", postLogin);
router.post("/register", postRegister);
router.post("/forgotPassword", postForgotPassword);
router.post("/verifyPassword", postVerifyOneTimePassword);



// Protected Routes.

router.post("/updatePassword", authorizationMiddleware, updatePassword);
router.post("/clients", authorizationMiddleware, postClients);
router.get("/clients", authorizationMiddleware, getClients);
router.get("/auth", authorizationMiddleware, getAuth);

export default router;

export type AuthenticatedRequest = Request & { user?: { username: string, authenticated: boolean, user_id: number } };
