import { Product } from "../../config/db";
import { UpdateProduct } from "../../types/product";
import { getProductById } from "./02 - getProducts";

export const updateProduct = async ({id,data}:UpdateProduct) => {

  if(!data.name && !data.price) throw new Error(`Props missing`)
  
  const checkUpdate = await Product.update(
    { 
      price:data.price, 
      name:data.name
    },
    {
      where:{ id }
    }
  );

  if(checkUpdate[0] === 0) throw new Error(`An error occured updating`)

  const product = await getProductById(id);

  return product;
}