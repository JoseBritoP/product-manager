import { Router } from "express";

// Handlers

import { GET,DELETE,GETBYID,PATCH,POST,PUT,TRUEDELETE } from "../handlers/productsHandlers";

const productRouter = Router();

// Endpoints:

productRouter.get('/',GET)
productRouter.get('/:id',GETBYID)
productRouter.post('/',POST)
productRouter.put('/:id',PUT)
productRouter.patch('/:id',PATCH)
productRouter.delete('/:id',DELETE)
productRouter.delete('/delete/:id',TRUEDELETE)

export default productRouter;