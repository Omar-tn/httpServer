import { describe, it, expect, beforeAll } from "vitest";
import { checkPasswordHash, hashPassword, makeJWT, Payload, validateJWT } from "./auth";
import { error } from "node:console";

describe("Password Hashing", () => {
  const password1 = "correctPassword123!";
  const password2 = "anotherPassword456!";
  let hash1: string;
  let hash2: string;

  beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
  });

  it("should return true for the correct password", async () => {
    const result = await checkPasswordHash(password1, hash1);
    expect(result).toBe(true);
  });

  

  let token1: string ,token2: string;

  beforeAll(async () => {

    token1 = makeJWT('1234',180,'p1234');
    token2 = makeJWT('5678',0,'p5678');



  });


  it('should return the id ',async()=>{

    let res = validateJWT(token1 , 'p1234');
    expect(res).toBe('1234');

  });

   it('should return an error ',async()=>{

   
    expect(()=> validateJWT(token2 , 'p5678')).toThrow(Error);
   });
    


});