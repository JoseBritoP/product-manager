import { Request,Response } from "express";
import { createProduct } from "../controllers/product";


export async function getProducts(req:Request,res:Response) {
  res.status(200).json({DIY:"GET Products"})
}

export async function GETBYID(req:Request,res:Response) {
  const { id } = req.params;
  res.status(200).json({DIY:`GET Product ${id}`})
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

  res.status(200).json({DIY:`PUT Product ${id}`})
}

export async function PATCH(req:Request,res:Response) {
  const { id } = req.params;

  res.status(200).json({DIY:`PATCH Product ${id}`})
}

export async function DELETE(req:Request,res:Response) {
  const { id } = req.params;

  res.status(200).json({DIY:`DELETE Product ${id}`})
}