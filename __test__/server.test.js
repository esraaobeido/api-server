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
        expect(result.status).toBe(200);
     })
     it("Test get One Food ",async ()=>{
        const result = await request.get("/food/1");
        expect(result.status).toBe(200);
     })
     it("Test update Food ",async ()=>{
       const result = await request.put("/food/1")
       expect(result.status).toBe(201);
     })
    it("Test delete Food ",async ()=>{
       const result = await request.delete("/food/1");
       expect(result.status).toBe(204);
     })
     it("Test get foodIngredients", async()=>{
      const result = await request.get("/foodIngredients/1");
      expect(result.status).toBe(200);
     })
     it("Test get foodRecipes", async()=>{
      const result = await request.get("/foodRecipes/1");
      expect(result.status).toBe(200);
     })
})
describe("Testing Server ingredient route",()=>{
   it("Test bad method",async ()=>{
      const result = await request.get("/ingredi");
      expect(result.status).toBe(404);
    })
   it("Test create ingredient ",async ()=>{
       const result = await request.post("/ingredient").send({
           IngredientName: "rice",
           foodId : 1
       });
       expect(result.status).toBe(201);
    });

    it("Test get ingredient ",async ()=>{
       const result = await request.get("/ingredient");
       expect(result.status).toBe(200);
    })
    it("Test get One ingredient ",async ()=>{
       const result = await request.get("/ingredient/1");
       expect(result.status).toBe(200);
    })
    it("Test update ingredient ", async ()=>{
      const result = await request.put("/ingredient/1").send({
         "IngredientName": "rice"
      });
      expect(result.status).toBe(201);
    })
   it("Test delete ingredient ",async ()=>{
      const result = await request.delete("/ingredient/1");
      expect(result.status).toBe(204)
    })
   })
   describe("Testing Server recipe route",()=>{
      it("Test bad method",async ()=>{
         const result = await request.get("/reci");
         expect(result.status).toBe(404);
       })
      it("Test create recipe ",async ()=>{
          const result = await request.post("/recipe").send({
            RecipeName: "rice",
              foodId : 1
          });
          expect(result.status).toBe(201);
       });
   
       it("Test get recipe ",async ()=>{
          const result = await request.get("/recipe");
          expect(result.status).toBe(200);
       })
       it("Test get One recipe ",async ()=>{
          const result = await request.get("/recipe/1");
          expect(result.status).toBe(200);
       })
       it("Test update recipe ", async ()=>{
         const result = await request.put("/recipe/1").send({
            RecipeName: "rice"
         });
         expect(result.status).toBe(201);
       })
      it("Test delete recipe ",async ()=>{
         const result = await request.delete("/recipe/1");
         expect(result.status).toBe(204)
       })
      })
// describe("Testing Server clothes route",()=>{
//    it("Test bad method",async ()=>{
//       const result=await request.get("/cloth");
//       expect(result.status).toBe(404)
//    })
//    it("Test create Clothes ",async ()=>{
//        const result=await request.post("/clothes").send({
//          "ClothesType": "Jacket",
//          "Season": "Winter "
//        });
//        expect(result.status).toBe(201);
//     });
//    it("Test get Clothes ",async ()=>{
//        const result = await request.get("/clothes");
//        expect(result.status).toBe(200)
//     })
//    it("Test get One Clothes ",async ()=>{
//        const result = await request.get("/clothes/1");
//        expect(result.status).toBe(200)
//     })
//    it("Test update Clothes ",async ()=>{
//       const result = await request.put("/clothes/1")
//       expect(typeof result).toBe("object")
//    })
//    it("Test delete Clothes ",async ()=>{
//       const result = await request.delete("/clothes/1");
//       expect(result.status).toBe(204)
//    })

// })
afterAll(async () => {
    await db.drop();
});