'use strict';
const { app } = require('../src/server'); 
const supertest = require("supertest")
const request = supertest(app)
const { db } = require('../src/models/index');

beforeAll(async() => {
    await db.sync();
});

describe("Testing Server food route",()=>{
    it("Test bad method",async ()=>{
       const result = await request.get("/foo");
       expect(result.status).toBe(404)
     })
    it("Test create Food ",async ()=>{
        const result = await request.post("/food").send({
            "FoodType": "Shawerma"
        });
        expect(result.status).toBe(201);
     });
     it("Test get Food ",async ()=>{
        const result = await request.get("/food");
        expect(result.status).toBe(200)
     })
     it("Test get One Food ",async ()=>{
        const result = await request.get("/food/1");
        expect(result.status).toBe(200)
     })
     it("Test update Food ",async ()=>{
       const result = await request.put("/food/1")
       expect(result.status).toBe(201)
     })
    it("Test delete Food ",async ()=>{
       const result = await request.delete("/food/1");
       expect(result.status).toBe(204)
     })
})

describe("Testing Server clothes route",()=>{
   it("Test bad method",async ()=>{
      const result=await request.get("/cloth");
      expect(result.status).toBe(404)
   })
   it("Test create Clothes ",async ()=>{
       const result=await request.post("/clothes").send({
         "ClothesType": "Jacket",
         "Season": "Winter "
       });
       expect(result.status).toBe(201);
    });
   it("Test get Clothes ",async ()=>{
       const result = await request.get("/clothes");
       expect(result.status).toBe(200)
    })
   it("Test get One Clothes ",async ()=>{
       const result = await request.get("/clothes/1");
       expect(result.status).toBe(200)
    })
   it("Test update Clothes ",async ()=>{
      const result = await request.put("/clothes/1")
      expect(typeof result).toBe("object")
   })
   it("Test delete Clothes ",async ()=>{
      const result = await request.delete("/clothes/1");
      expect(result.status).toBe(204)
   })

})
afterAll(async () => {
    await db.drop();
});