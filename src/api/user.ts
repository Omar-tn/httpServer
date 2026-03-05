import { NextFunction, Request, Response } from "express";
import { createUser, deleteAllUsers } from "../db/queries/users.js";
import { NewUser } from "../db/schema.js"; 
import { apiConf } from "../config.js";
//import s from '../db/queries/'
export async function accepteUser(req: Request, res: Response, next: NextFunction){

    let body= req.body;
    let user : NewUser = {
        email: body.email
    }
    let newUser= await createUser(user);

    res.status(201).json(newUser);


}export async function clearUsers(req: Request, res: Response, next: NextFunction) {

    if (apiConf.api.platform == 'dev')
        await deleteAllUsers();

    else
        res.status(403);

    res.send();

    next();

}

