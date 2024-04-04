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

describe('PUT /product/:id',()=>{
  describe('Success Case',()=>{
    it('Should return the Product with the name change',async()=>{
      const newProduct = {
        "name":"MousePad",
        "price":200
      };
      const res = await request(app).post('/product').send(newProduct);

      const { id, name, price } = res.body;

      const updatedProduct = {
        "name":"MousePad Edit"
      }
      const updateProduct = await request(app).put(`/product/${id}`).send(updatedProduct);
      expect(updateProduct.status).toBe(200);
      expect(updateProduct.body.name).not.toEqual(name)
      expect(updateProduct.body.price).toEqual(price)
    })
    it('Should return the Product with the price change',async()=>{
      const newProduct = {
        "name":"Monitor Gaming",
        "price":300
      };
      const res = await request(app).post('/product').send(newProduct);

      const { id, name, price } = res.body;

      const updatedProduct = {
        "price":499
      }
      const updateProduct = await request(app).put(`/product/${id}`).send(updatedProduct);
      expect(updateProduct.status).toBe(200);
      expect(updateProduct.body.name).toEqual(name)
      expect(updateProduct.body.price).not.toEqual(price)
    })
    it('Should return the Product with the props changes',async()=>{
      const newProduct = {
        "name":"Keyboard",
        "price":300
      };
      const res = await request(app).post('/product').send(newProduct);

      const { id, name, price } = res.body;

      const updatedProduct = {
        "name":"Keyboard Gaming",
        "price":399
      }
      const updateProduct = await request(app).put(`/product/${id}`).send(updatedProduct);
      expect(updateProduct.status).toBe(200);
      expect(updateProduct.body.name).not.toEqual(name)
      expect(updateProduct.body.price).not.toEqual(price)
    })
  })
  describe('Error Case',()=>{
    it('Should return a 400 bad request code',async()=>{
      const newProduct = {
        "name":"Airpods",
        "price":199
      };
      const response = await request(app).post('/product').send(newProduct);

      const { id, name, price } = response.body;
      const product ={
        "name":"",
        "price":"",
      }
      const badRequest = await request(app).put(`/product/${id}`).send(product);
      expect(badRequest.status).toBe(400);

    })
    it('Should return a message if the prop is missing',async()=>{
      const newProduct = {
        "name":"Cable USB",
        "price":199
      };
      const response = await request(app).post('/product').send(newProduct);

      const { id, name, price } = response.body;
      const product ={
        "name":"",
        "price":"",
      }
      const badRequest = await request(app).put(`/product/${id}`).send(product);
      expect(badRequest.status).toBe(400);
      expect(badRequest.body).toHaveProperty('error');
      expect(badRequest.badRequest).toBe(true);
      expect(badRequest.body.error).toMatch('Props missing')

    })
    it('Should return a message if product not found',async()=>{
      const id ='2bed6715-9d45-4402-93ef-f61220863eb4';
      const product = {
        "name":"Product Edit",
        "price":300
      };
      const response = await request(app).put(`/product/${id}`).send(product);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Product not found')
    })
  })
})

describe('PATCH /product/:id',()=>{
  describe('Success Case',()=>{
    it('Should return a 200 status code',async()=>{
      const newProduct = {
        "name": "Controller PS5",
        "price":49
      };

      const response = await request(app).post('/product').send(newProduct);

      const { id, name, price, inStock } = response.body;

      const check = await request(app).patch(`/product/${id}`);
      expect(check.status).toBe(200)
      expect(check.body.id).toBeDefined();
      expect(check.body.name).toEqual(name)
      expect(check.body.price).toEqual(price)
      expect(check.body.inStock).not.toEqual(inStock);
    });
    it('Should return a json Product ',async()=>{
      const newProduct = {
        "name": "Controller PS4",
        "price":49
      };

      const response = await request(app).post('/product').send(newProduct);

      const { id, name, price, inStock } = response.body;

      const check = await request(app).patch(`/product/${id}`);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(check.status).toBe(200)
      expect(check.body.id).toBeDefined();
      expect(check.body.name).toEqual(name)
      expect(check.body.price).toEqual(price)
      expect(check.body.inStock).not.toEqual(inStock);
      expect(check.body.inStock).toEqual(false);
    });
    it('Should return a Product with inStock property in false',async()=>{
      const newProduct = {
        "name": "Xbox Controller",
        "price":49
      };

      const response = await request(app).post('/product').send(newProduct);

      const { id, name, price, inStock } = response.body;

      const check = await request(app).patch(`/product/${id}`);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(check.status).toBe(200)
      expect(check.body.id).toBeDefined();
      expect(check.body.name).toEqual(name)
      expect(check.body.price).toEqual(price)
      expect(check.body.inStock).not.toEqual(inStock);
      expect(check.body.inStock).toEqual(false);
    });
  })
  describe('Error Case',()=>{
    it('Should return a 404 status code if the product not exist',async()=>{
      const id = '96f4b436-bbb8-49de-b4e1-8c9e561c151b'

      const check = await request(app).patch(`/product/${id}`);
      expect(check.headers['content-type']).toMatch(/application\/json/);
      expect(check.status).toBe(404)
    })
    it('Should return a error property if the product not exist',async()=>{
      const id = '96f4b436-bbb8-49de-b4e1-8c9e561c151b'

      const check = await request(app).patch(`/product/${id}`);
      expect(check.headers['content-type']).toMatch(/application\/json/);
      expect(check.status).toBe(404)
      expect(check.body).toHaveProperty('error');
      expect(check.body.error).toEqual('Product not found');
    })
  })
})

describe('DELETE /product/:id',()=>{
  describe('Success Case',()=>{
    it('Should return a 200 status code if the product was successfully "deleted"',async()=>{
      const newProduct = {
        "name":"Keyboard mini - Pro",
        "price":299
      };

      const response = await request(app).post('/product').send(newProduct);

      const product = await request(app).delete(`/product/${response.body.id}`);
      console.log(product.body)
      expect(product.status).toBe(200);
    })
    it('Should return a Product with the property deleted in true',async()=>{
      const newProduct = {
        "name":"PS5",
        "price":299
      };

      const response = await request(app).post('/product').send(newProduct);

      const product = await request(app).delete(`/product/${response.body.id}`);
      expect(product.headers['content-type']).toMatch(/application\/json/);
      expect(product.status).toBe(200);
      expect(product.body.id).toBeDefined();
      expect(product.body.deleted).toBe(true);
    })
  })
  describe('Error Case',()=>{
    it('Should return a 404 status code if the product not exist',async()=>{
      const id = '96f4b436-bbb8-49de-b4e1-8c9e561c151b'

      const check = await request(app).patch(`/product/${id}`);
      expect(check.headers['content-type']).toMatch(/application\/json/);
      expect(check.status).toBe(404)
    })
    it('Should return a error property if the product not exist',async()=>{
      const id = '96f4b436-bbb8-49de-b4e1-8c9e561c151b'

      const check = await request(app).patch(`/product/${id}`);
      expect(check.headers['content-type']).toMatch(/application\/json/);
      expect(check.status).toBe(404)
      expect(check.body).toHaveProperty('error');
      expect(check.body.error).toEqual('Product not found');
    })
  })
});

describe('DELETE /product/delete/:id',()=>{
  describe('Success case',()=>{
    it('Should return a 200 status code',async()=>{
      const newProduct = {
        "name":"GPU",
        "price":299
      }

      const response = await request(app).post('/product').send(newProduct);

      const res = await request(app).delete(`/product/delete/${response.body.id}`)
      expect(res.status).toBe(200);
    })
    it('Should return a number of product deleted',async()=>{
      const newProduct = {
        "name":"GPU - SSD",
        "price":299
      }

      const response = await request(app).post('/product').send(newProduct);

      const res = await request(app).delete(`/product/delete/${response.body.id}`)
      expect(res.status).toBe(200);
      expect(res.body).toBe(1)
    })
  })
  describe('Error case',()=>{
    it('Should return a error if the product not exist',async()=>{
      const id = '67c60b1d-1a82-44a7-98ff-77493005fd0c'
      const res = await request(app).delete(`/product/delete/${id}`)
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toMatch(`An error has ocurred destroying the product ${id}`)
    })
  })
});