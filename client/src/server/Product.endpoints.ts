import axios from "axios"
import { safeParse } from "valibot"
import { DraftProductSchema } from "../types"

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