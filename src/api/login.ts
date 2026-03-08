import e, { Request, Response } from "express";
import { checkPasswordHash, makeJWT, makeRefreshToken } from "../auth/auth.js";
import { getUserByEmail } from "../db/queries/users.js";
import { respondWithJSON } from "./json.js";
import { apiConf } from "../config.js";
import { createRefresh_token } from "../db/queries/refresh_tokens.js";

export async function loginHandler(req: Request, res:Response) {
    
    let body = req.body;
    let password = body.password;
    let email = body.email;
    
    
    let user = await getUserByEmail(email);
    let valid = await checkPasswordHash(password, user.hashed_password);
    
    let {hashed_password, ...saveUser} = user;
    
    if (valid){

        let token = makeJWT(user.id, 3600, apiConf.api.secret);
        let refresh = makeRefreshToken();
        let ref_token = createRefresh_token(refresh,user.id, 60);

        respondWithJSON(res, 200,{ 
                ...saveUser,
                token: token,
                refreshToken: refresh
            });
    }
        
    else 
        respondWithJSON(res, 401, "incorrect email or password"); // Unauthorized 401


}