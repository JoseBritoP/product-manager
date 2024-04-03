import { Product } from "../../config/db";
import { NewProduct } from "../../types/product";

const checkName = async(name:string) =>{
  const productExist = await Product.findOne({
    where:{
      name
    }
  });

  if(productExist) throw new Error(`The Product ${name} already created`)
}

export const createProduct = async ({name,price}:NewProduct) => {
  await checkName(name);
  const productFormat = {
    name,price
  }
  const newProduct = await Product.create(productFormat);

  return newProduct

}