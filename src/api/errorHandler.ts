import e, { Request, Response, NextFunction } from 'express';

export class ExceedLimitError extends Error {
    constructor(message: string){
        super(message);
    }

}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    console.log(err);
    
    if(err  instanceof ExceedLimitError)
        res.status(400).json({
            error: err.message
        });

    else
        res.status(500).json({
            error: "Something went wrong on our end"
        });

}   
