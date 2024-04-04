import { createBrowserRouter } from "react-router-dom";
import { Home, Error, Products, ProductForm, EditProductForm } from "./views";
import { action as NewProductAction } from "./components/Form/Form";
import { loader as productsLoader, action as inStockAction } from "./views/Products";
import { loader as editProductLoader } from "./components/Form/EditProducFormt";
import { action as editProductAction } from "./components/Form/EditProducFormt";
import { action as deleteProductAction } from "./components/shared/ProductDetails";

export const router = createBrowserRouter([
  {
    path:'',
    element:<Home/>,
    children:[
      {
        index:true,
        element:<Products/>,
        loader:productsLoader,
        action:inStockAction
      },
      {
        path:'/product/new',
        element:<ProductForm/>,
        action:NewProductAction
      },
      {
        path:'/product/:id/edit',
        element:<EditProductForm/>,
        loader:editProductLoader,
        action:editProductAction
      },
      {
        path:'/product/:id/delete',
        action:deleteProductAction
      }
    ]
  },
  {
    path:'/*',
    element:<Error/>
  },
])