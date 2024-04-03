import { Request,Response } from "express";


export async function getProducts(req:Request,res:Response) {
  res.status(200).json({DIY:"GET Products"})
}

export async function GETBYID(req:Request,res:Response) {
  const { id } = req.params;
  res.status(200).json({DIY:`GET Product ${id}`})
}

export async function POST(req:Request,res:Response) {
  res.status(201).json({DIY:"POST Products"})
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