import { Router } from "express";

// Handlers

import { GET,DELETE,GETBYID,PATCH,POST,PUT,TRUEDELETE } from "../handlers/productsHandlers";

const productRouter = Router();

// Middlewares

import { postProduct } from "../middlewares/product";

// Endpoints:

productRouter.get('/',GET)
productRouter.get('/:id',GETBYID)
productRouter.post('/',postProduct,POST)
productRouter.put('/:id',PUT)
productRouter.patch('/:id',PATCH)
productRouter.delete('/:id',DELETE)
productRouter.delete('/delete/:id',TRUEDELETE)

export default productRouter;