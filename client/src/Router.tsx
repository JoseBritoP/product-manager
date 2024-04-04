import { createBrowserRouter } from "react-router-dom";
import { Home, Error, Products, ProductForm } from "./views";
import { action as NewProductAction } from "./components/Form/Form";
import { loader as productsLoader } from "./views/Products";

export const router = createBrowserRouter([
  {
    path:'',
    element:<Home/>,
    children:[
      {
        index:true,
        element:<Products/>,
        loader:productsLoader
      },
      {
        path:'/product/new',
        element:<ProductForm/>,
        action:NewProductAction
      }
    ]
  },
  {
    path:'/*',
    element:<Error/>
  },
])