import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { NewUser, users } from "../schema.js";
import { saveUser} from '../schema.js';

export async function createUser(user: NewUser): Promise<NewUser> {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();

    
    return result;
}

export async function deleteAllUsers(){

    const [res] = await db.delete(users);
    

}

export async function getUserByEmail(email:string) {
  
  let [res] = await db.select().from(users).where(eq(users.email,email));

  return res;

}

export async function updateEmailPasword(userid:string, email: string, password: string) {
  
  let [res] = await db.update(users).set({email: email, hashed_password: password}).where(eq(users.id, userid)).returning();

  return res;
  

}


export async function upgradeUser(userId:string) {

  let [res] = await db.update(users).set({isChirpyRed: true}).where(eq(users.id,userId)).returning();
   
  return res;
}
