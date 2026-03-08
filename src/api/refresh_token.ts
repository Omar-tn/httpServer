import { Request, Response } from "express";
import { getBearerToken, makeJWT } from "../auth/auth.js";
import { respondWithJSON } from "./json.js";
import { getRefreshToken, getUserFromRefreshToken, revokeRefreshToken } from "../db/queries/refresh_tokens.js";
import { apiConf } from "../config.js";


export async function refreshTokenHandler(req:Request, res: Response) {
    
    let token = getBearerToken(req);
    if(!token) respondWithJSON(res, 401, "no refresh token");

    let user_token = await getUserFromRefreshToken(token);
    if(!user_token || user_token.refresh_tokens.revoked_at){
        respondWithJSON(res, 401, "invalid refresh token");
        return;
    }
    
    let newToken = makeJWT(user_token.users.id, 3600, apiConf.api.secret);

    respondWithJSON(res, 200, {token: newToken});
}

export async function revokeHandler(req:Request, res: Response) {
    
    let token = getBearerToken(req);
    let revoked = await revokeRefreshToken(token);

    if(!revoked) {
        respondWithJSON(res, 401, "Revoke refresh token Faild!");
        return;
    }

    respondWithJSON(res, 204);


}