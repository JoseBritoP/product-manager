import { Product } from "../../config/db";
import { getProductById } from "./02 - getProducts";

export const deleteLogical = async (id:string) => {
  const product:any = await Product.findByPk(id);

  product.deleted = !product.deleted;

  await product.save();

  return product;
};

export const deleteProduct = async (id:string) => {

  const productDeleted = await Product.destroy({
    where:{
      id
    }
  });

  if(!productDeleted) throw new Error(`An error has ocurred deleting the product ${id}`);

  return productDeleted;

};