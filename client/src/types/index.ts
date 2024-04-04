import { object,string,number, boolean, Output, array } from "valibot"

export const DraftProductSchema = object({
  name:string(),
  price:number()
})

export const ProductSchema = object({
  id:string(),
  name:string(),
  price:number(),
  inStock:boolean()
})

export const ProductsSchema = array(ProductSchema)
export type Product = Output<typeof ProductSchema>