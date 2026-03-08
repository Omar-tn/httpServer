import e, { NextFunction, Request, Response } from "express";
import { createUser, deleteAllUsers, updateEmailPasword, upgradeUser } from "../db/queries/users.js";
import { NewUser } from "../db/schema.js"; 
import { apiConf } from "../config.js";
import { getAPIKey, getBearerToken, hashPassword, validateJWT } from "../auth/auth.js";
import { respondWithJSON } from "./json.js";
//import s from '../db/queries/'
export async function accepteUser(req: Request, res: Response, next: NextFunction){

    let body= req.body;
    let password = body.password;
    let hashed = await hashPassword(password);
    let user: NewUser = {
        email: body.email,
        hashed_password: hashed
    }
    
    let userCreated= await createUser(user);

    let {hashed_password, ...newUser} = userCreated;
    
  
    res.status(201).json(newUser);


}export async function clearUsers(req: Request, res: Response, next: NextFunction) {

    if (apiConf.api.platform == 'dev')
        await deleteAllUsers();

    else
        res.status(403);

    res.send();

    next();

}


export async function userChangeinfo(req:Request, res: Response) {
    
    let acc_token = getBearerToken(req);
    let email = req.body.email;
    let password = req.body.password;

    let hashed = await hashPassword(password);

    let userId = validateJWT(acc_token,apiConf.api.secret);

    let resl = await updateEmailPasword(userId, email, hashed);

    
    if(!resl){
        respondWithJSON(res,400, {error: "something went wrong in updating"});
        return;
    
    }

    respondWithJSON(res, 200, resl);



}


export async function eventUserHandler(req:Request, res: Response) {
    
    let key =getAPIKey(req);

    if (key !== apiConf.api.polka){
        respondWithJSON(res,401,'Authorization failed');
        return;
    }

    let event = req.body.event;
    if (!event){
        respondWithJSON(res, 400, {error: "no event in body"});
        return;
    } 
    if(event != 'user.upgraded'){
        respondWithJSON(res, 204);
        return;
    }
    let userId;
    if(req.body.data)
        userId = req.body.data.userId;
    let r;
    try{
        r = await upgradeUser(userId);

        if(!r)
            throw new Error();
    }catch(e){

        respondWithJSON(res, 404, 'User not found');
        return;
    
    }

    //let {is_chirpy_red, ...rs }= r;


    respondWithJSON(res, 204,r);


    

}