import request from 'supertest';
import app from '../src/app';

describe('GET /product - Error case',()=>{
  it('should response with a 404 status code',async()=>{
    const response = await request(app).get('/product');
    expect(response.status).toBe(404);
    expect(response.ok).toBe(false);
  });
  it('should response with a message "No products"',async()=>{
    const response = await request(app).get('/product');
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe(`No products`);
  })
})

describe('POST /product',()=>{
  describe('Success case',()=>{
    it('should respond with a 201 status code',async()=>{
      const newProduct = {
        "name":"Mouse - Testing One",
        "price":400
      };
      const response = await request(app).post('/product').send(newProduct);
      expect(response.status).toBe(201);
      expect(response.ok).toBe(true);
    });
    
    it('should respond a json with product properties',async()=>{
      const newProduct = {
        "name":"Mouse - Testing",
        "price":400
      };
      const response = await request(app).post('/product').send(newProduct);
      expect(response.status).toBe(201)
      expect(response.ok).toBe(true);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      const { id, name, price, deleted, inStock } = response.body;
      expect(id).toBeDefined();
      expect(name).toEqual(newProduct.name);
      expect(price).toEqual(newProduct.price);
      expect(deleted).toBe(false);
      expect(inStock).toBe(true);

    })
  });
  describe('Error case',()=>{
    it("should respond with a message in case the email already use",async()=>{
      const newProduct = {
        "name":"Mouse - Testing",
        "price":400
      };
      const response = await request(app).post("/product").send(newProduct);
      expect(response.status).toBe(400)
      expect(response.clientError).toBe(true);
      expect(response.body.error).toBe(`The Product ${newProduct.name} already created`);
    });
    it('should respond with a error property',async()=>{
      const newProduct = {
        "name":"Mouse - Testing",
        "price":400
      };
      const response = await request(app).post("/product").send(newProduct);
      expect(response.status).toBe(400)
      expect(response.clientError).toBe(true);
      expect(response.body).toHaveProperty('error')
    })
  })
});

describe('GET /product - Success case',()=>{
  it('should respond with a 200 status code',async()=>{
    const response: request.Response = await request(app).get('/product');
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
  });
  it('should return an array of products',async()=>{
    const response: request.Response = await request(app).get('/product');
    expect(response.body).toBeInstanceOf(Array);
  });
});
