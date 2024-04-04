import { createBrowserRouter } from "react-router-dom";
import { Home, Error, Products, ProductForm } from "./views";

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
        element:<ProductForm/>
      }
    ]
  },
  {
    path:'/*',
    element:<Error/>
  },
])