import { createBrowserRouter } from "react-router-dom";
import { Home, Error, Products, ProductForm } from "./views";
import { action as NewProductAction } from "./components/Form/Form";

export const router = createBrowserRouter([
  {
    path:'',
    element:<Home/>,
    children:[
      {
        index:true,
        element:<Products/>
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