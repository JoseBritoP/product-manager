import { NextFunction, Request,Response } from "express";
import { check,validationResult } from "express-validator";

export async function postProduct(req:Request,res:Response,next:NextFunction) {

  await check('name')
  .notEmpty().withMessage('The name is required')
  .run(req)

  await check('price')
  .notEmpty().withMessage('The price is required')
  .isNumeric().withMessage('The price must be a number')
  .isFloat().withMessage('Price value not valid')
  .custom((value)=> !(typeof value === 'string')).withMessage('The price must be a number')
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()})
  }
  next()
}