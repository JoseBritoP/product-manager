import { Product } from "../../config/db";

export const getProducts = async () => {

  const products = await Product.findAll({
    where:{
      deleted:false
    },
    attributes:['id','name','price','inStock']
  });

  if(!products.length) throw new Error(`No products`);
  
  return products
};

export const getProductById = async (id:string) => {

  const product = await Product.findOne({
    where:{
      deleted:false,
      id
    },
    attributes:['id','name','price','inStock']
  });

  if(!product) throw new Error(`Product not found`);

  return product

};