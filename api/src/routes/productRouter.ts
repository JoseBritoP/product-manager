import { Router } from "express";

// Handlers

import { getProducts,DELETE,GETBYID,PATCH,POST,PUT } from "../handlers/productsHandlers";

const productRouter = Router();

// Endpoints:

productRouter.get('/',getProducts)
productRouter.get('/:id',GETBYID)
productRouter.post('/',POST)
productRouter.put('/:id',PUT)
productRouter.patch('/:id',PATCH)
productRouter.delete('/delete/:id',DELETE)

export default productRouter;