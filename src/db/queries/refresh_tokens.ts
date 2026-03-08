import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { refresh_tokens, users } from "../schema.js";

export async function createRefresh_token(token:string, userId: string, expires_in_days: number) {
    
    let [res] = await db.insert(refresh_tokens).values({
        token,
        user_id: userId,
        expires_at:new Date(Date.now() + (1000*3600*24*expires_in_days)),
    }).returning();

    return res;

}

export async function getUserFromRefreshToken(token:string) {
    
    let [res] = await db.select().from(refresh_tokens).where(eq(refresh_tokens.token, token))
        .innerJoin(users, eq(refresh_tokens.user_id, users.id));
    
    return res;



}

export async function getRefreshToken(token:string) {

    let [res] = await db.select().from(refresh_tokens).where(eq(refresh_tokens.token, token));

    return res;

}

export async function revokeRefreshToken(token:string) {
    
    let ref_token = await getRefreshToken(token);

    let [res] = await db.update(refresh_tokens).set({revoked_at: new Date()}).returning();
    return res;
}
