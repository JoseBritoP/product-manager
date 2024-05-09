import axios from "axios"
import { safeParse } from "valibot"
import { DraftProductEditSchema, DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"

type ProductData = {
  [k: string]: FormDataEntryValue
}

export async function addProduct (data:ProductData){
  try {
    const result = safeParse(DraftProductSchema,{
      name:data.name,
      price:+data.price
    });
    if(result.success){
      const url = `${import.meta.env.VITE_API_URL}/product`;
      await axios.post(url,{
        name:result.output.name,
        price:result.output.price
      });
    } else throw new Error(`Data invalid`)

  } catch (error) {
    console.log(error)
  }
}

export async function editProduct(id:Product['id'],data:ProductData){
  try {
    const result = safeParse(DraftProductEditSchema,{
      name:data.name,
      price:+data.price
    });
    console.log(result)
    if(result.success){
      const url = `https://product-manager-api-production.up.railway.app//product/${id}`;
      await axios.put(url,{
        name:result.output.name,
        price:result.output.price
      });
    } else throw new Error(`Data invalid`)

  } catch (error) {
    console.log(error)
  }
}

export async function getProducts(){
  try {
    const url = `https://product-manager-api-production.up.railway.app//product`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema,data)
    if(result.success) return result.output;
    else throw new Error(`No products...`)
      
  } catch (error) {
    console.log('Error') 
  }
}

export async function getProductById(id:Product['id']){
  try {
    const url = `https://product-manager-api-production.up.railway.app//product/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema,data)
    if(result.success) return result.output;
    else throw new Error(`No products...`)
      
  } catch (error) {
    console.log('Error') 
  }
}

export async function inStockProduct(id:Product['id']){
  try {
    const url = `https://product-manager-api-production.up.railway.app//product/${id}`;
    const { data } = await axios.patch(url);
    const result = safeParse(ProductSchema,data)
    if(result.success) return result.output;
      
  } catch (error) {
    console.log('Error') 
  }
}

export async function deleteProduct(id: Product['id']) {
  try {
      const url = `https://product-manager-api-production.up.railway.app//product/${id}`
      await axios.delete(url)
  } catch (error) {
      console.log(error)
  }
}