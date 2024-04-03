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

describe('GET /product/:id',()=>{
  describe('Success Case',()=>{
    it('Should response with a json with Product properties',async()=>{
      const newProduct = {
        "name":"Mouse - Testing - Two",
        "price":299
      };
      const res = await request(app).post('/product').send(newProduct);
      const response = await request(app).get(`/product/${res.body.id}`);
      const { id, name, price } = response.body;
      expect(id).toBeDefined();
      expect(name).toEqual(newProduct.name);
      expect(price).toEqual(newProduct.price);
    })
  });
  describe('Error Case',()=>{
    const id = '10164e2d-c338-46ff-9ef9-9df00f18ee7e'
    it('Should response with a 404 status code',async()=>{
      const response = await request(app).get(`/product/${id}`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Product not found');
    })
    it('Should response with message:"Product not found"',async()=>{
      const response = await request(app).get(`/product/${id}`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Product not found');
    })
  });
})