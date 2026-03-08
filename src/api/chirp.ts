import { Request, Response } from 'express';
import { createChirp, deleteChirpById, getAllChirps, getChirp } from '../db/queries/chirps.js';
import { NewChirp } from '../db/schema.js';
import { ExceedLimitError } from './errorHandler.js';
import { respondWithJSON } from './json.js';
import { getBearerToken, validateJWT } from '../auth/auth.js';
import { apiConf } from '../config.js';

export async function createChirpsHandler(req: Request, res: Response) {

    //let body = "";
    try {
        let token = getBearerToken(req);
        
        if (!token) {
            respondWithJSON(res, 401, { error: 'No token provided' });
            return;
        }
        let userId = validateJWT(token,apiConf.api.secret);

        let msg: string = req.body.body;
        res.contentType('application/json');

        if (msg.length > 140) {
            throw new ExceedLimitError('Chirp is too long. Max length is 140');

        }

        // else
        let tmp = msg.toLocaleLowerCase();

        let split = msg.split(' ');
        let profines = [/kerfuffle/i, /sharbert/i, /fornax/i];
        profines.forEach((e) => {

            for (let i = 0; i < split.length; i++) {
                if (split[i].toLocaleLowerCase().match(e))
                    split[i] = '****';
            }

        });

        let result = split.join(" ");
        //let userId = req.body.userId;
        let chirp: NewChirp = {
            body: result,
            user_id: userId,
        };
        let resp;
    
        resp = await createChirp(req, res, chirp);
        
        respondWithJSON(res, 201, resp);
        
    } catch (error) {
        if(error instanceof Error)
            respondWithJSON(res, 401, { error: error.message });
    }

   


    /*  req.on('data',(c)=>{
         body +=c;
     });
 
     req.on('end',()=>{
         let b = req.body;
    
         try {
             b = JSON.parse(body);
         } catch (error) {
             
             res.status(404).send(`{
                 "error": "somthing went wrong"
                 }`);
         }
 
         
  }); */
}

export async function chirpsHandler(req: Request, res: Response) {

    let r = await getAllChirps();
    respondWithJSON(res, 200, r);

}



export async function getChirpHandler(req:Request, res: Response) {
    
    let id = Array.isArray(req.params.chirpId) ? req.params.chirpId[0] : req.params.chirpId;

    let r = await getChirp(id);
    if(r != undefined)
        respondWithJSON(res, 200, r);

    else 
        respondWithJSON(res, 404, {error: "Chirp not found"});



}

export async function chirpDeletionHandler(req:Request, res: Response) {
    
    let id = req.params.chirpId as string;
    let token = getBearerToken(req);
    let userId = validateJWT(token, apiConf.api.secret);
    let r = await getChirp(id);
    if ( r.user_id !== userId){
        respondWithJSON(res, 403, {error: "You not allowed to delete this chirp, authentication failed!"});
        return;
    
    }

    let d = await deleteChirpById(id);

    if( !d)
        respondWithJSON(res, 404, {error: "Chirp not found"});

    else
        respondWithJSON(res, 204, {message: "Chirp deleted"});



}
