import { hash, verify } from "argon2";
import jwt, { JwtPayload }  from 'jsonwebtoken';
import { Request } from 'express';
import crypto from 'crypto';
import { errorHandler, InvalidTokenError } from "../api/errorHandler.js";

export type Payload = Pick<JwtPayload, 'iss' | 'sub' | 'iat' | 'exp'>;

 
export async function hashPassword(password:string): Promise<string> {

    let hashed = await hash(password);
    return hashed;


}

export async function checkPasswordHash(password:string, hash: string): Promise<boolean> {
    
    let res = await verify(hash, password)
    return  res;
}


export function makeJWT(userID: string, expiresIn: number, secret: string): string {


    let iat = Math.floor(Date.now()/1000);

    let payload: Payload = {
        iss: 'chirpy',
        sub: userID,
        iat: iat,
        exp: iat + expiresIn
    };

    let token = jwt.sign(payload, secret);
    return token;
}

export function validateJWT(token: string, secret: string) : string {
    
    let payload:Payload;

try{
    
         payload = jwt.verify(token, secret) as JwtPayload;
}catch(e){
    throw new InvalidTokenError('invalid token');
}
        if(payload instanceof Object && 'sub' in payload)
            return payload.sub!
        throw new InvalidTokenError('No user ID in the token');

    

    


}

export function getBearerToken(req: Request): string {

    
    let value = req.get('Authorization');
    if(!value || !value.startsWith('Bearer ')) 
        throw new InvalidTokenError('missing auth header');
    let token = value.split(' ')[1];
    if(!token) throw new InvalidTokenError('missing auth header');
    return token;


}

export function makeRefreshToken(){

    return crypto.randomBytes(32).toString('hex');

}