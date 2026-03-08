import { Request, Response } from "express";
import { db } from "../index.js";
import { chirps, NewChirp } from "../schema.js";
import { eq } from "drizzle-orm";

export async function createChirp(req: Request, res:Response,chirp: NewChirp) {


    let [re] = await db.insert(chirps).values(chirp).returning({id:chirps.id,createdAt: chirps.createdAt, updatedAt: chirps.updatedAt, body: chirps.body, userId: chirps.user_id});

    return re;
    
    
}
export async function getAllChirps() {

    let r = await db.select().from(chirps).orderBy(chirps.createdAt);
    return r;

}

export async function getChirp(id: string) {

    let [r] = await db.select().from(chirps).where(eq(chirps.id, id));
    return r;

}


export async function deleteChirpById(id:string) {
    
    let [r] = await db.delete(chirps).where(eq(chirps.id,id)).returning();

    return r;

}

export async function getChirpsByAutherId(authorId:string) {
    
    let r = await db.select().from(chirps).where(eq(chirps.user_id,authorId));

    return r;

}

