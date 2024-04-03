import { Request,Response,NextFunction,ErrorRequestHandler, Router } from "express";
import productRouter from "./productRouter";

const mainRouter = Router();
mainRouter.get('/',(req,res)=>{
  return res.send('hello')
})

// Endpoints

mainRouter.use('/product',productRouter);

mainRouter.use((req, res, next) => {
  const error:any = new Error(`La ruta ${req.originalUrl} con el método ${req.method} no está implementada`);
  error.status = 404;
  next(error);
});

mainRouter.use((error:any, req:Request, res:Response, next:NextFunction) => {
  res.status(error.status || 500).json({
    message: error.message || 'Error interno del servidor'
  });
});

export default mainRouter;