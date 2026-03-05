import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { apiConf } from '../config.js';

//export type middmiddlewereLogResponseslewere = (req : Request, res: Response, next: NextFunction) => void;

export  function middlewareLogResponses(req:Request, res: Response, next: NextFunction) {
    
    res.on('finish',()=>{
        const stat = res.statusCode!;
        
        if(stat < 200 || stat >=300){
            console.log('[NON-OK]',req.method, req.url, '- Status:',stat);

        }
    });

    next();


}

export function fileServerHits(req: Request, res: Response, next: NextFunction){

    
    apiConf.api.fileserverHits++;
    next();

}

export function hitsPrint(req: Request, res: Response, next: NextFunction){
     
    res.contentType('text/html;charset=utf-8');
    res.send(`<h1>Welcome, Chirpy Admin</h1>
          <p>Chirpy has been visited ${apiConf.api.fileserverHits} times!</p>`);
    

    next();
}


export function hitsReset(req: Request, res: Response, next: NextFunction){

    apiConf.api.fileserverHits=0;
    res.send();

    next();

}

