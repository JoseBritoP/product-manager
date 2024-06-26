import { Request,Response } from "express";
import { createProduct, getProductById, getProducts,updateProduct,deleteLogical,deleteProduct, patchInStock } from "../controllers/product";


export async function GET(req:Request,res:Response) {
  try {
    const products = await getProducts();
    return res.status(200).json(products)
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
}

export async function GETBYID(req:Request,res:Response) {
  const { id } = req.params;

  try {
    const product = await getProductById(id);
    return res.status(200).json(product)
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }

}

export async function POST(req:Request,res:Response) {
  const data = req.body;
  try {
    const newProduct = await createProduct(data);
    return res.status(201).json(newProduct)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }
}

export async function PUT(req:Request,res:Response) {
  const { id } = req.params;
  const data = req.body;

  try {
    const productUpdated = await updateProduct({id,data});
    return res.status(200).json(productUpdated)
  } catch (error:any) {
    return res.status(400).json({error:error.message})
  }

  res.status(200).json({DIY:`PUT Product ${id}`})
}

export async function PATCH(req:Request,res:Response) {
  const { id } = req.params;
  try {
    const inStock = await patchInStock(id);
    return res.status(200).json(inStock);
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
  res.status(200).json({DIY:`PATCH Product ${id}`})
}

export async function DELETE(req:Request,res:Response) {
  const { id } = req.params;
  try {
    const productDeleted = await deleteLogical(id);
    return res.status(200).json(productDeleted);
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
}

export async function TRUEDELETE(req:Request,res:Response) {
  const { id } = req.params;
  try {
    const productDeleted = await deleteProduct(id);
    return res.status(200).json(productDeleted);
  } catch (error:any) {
    return res.status(404).json({error:error.message})
  }
}