import { Product } from "../../config/db";
import { NewProduct } from "../../types/product";

export const createProduct = async ({name,price}:NewProduct) => {

  const productFormat = {
    name,price
  }
  const newProduct = await Product.create(productFormat);

  if(!newProduct) throw new Error(`An error has ocurred...`);

  return newProduct

}