import { Request, Response } from 'express';
import { createChirp, getAllChirps, getChirp } from '../db/queries/chirps.js';
import { NewChirp } from '../db/schema.js';
import { ExceedLimitError } from './errorHandler.js';
import { respondWithJSON } from './json.js';

export async function createChirpsHandler(req: Request, res: Response) {

    //let body = "";
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
    let userId = req.body.userId;
    let chirp: NewChirp = {
        body: result,
        user_id: userId,
    };
    let resp;
    try {
        resp = await createChirp(req, res, chirp);
    } catch (error) {
        throw new Error('Somthing went wrong');
    }

    respondWithJSON(res, 201, resp);


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
