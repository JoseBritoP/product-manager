import { Link, useLoaderData } from "react-router-dom"
import { getProducts } from "../server/Product.endpoints"
import ProductDetails from "../components/shared/ProductDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts()
  if(products){
    return products
  }
  return null
}

export default function Products() {

  const products = useLoaderData() as Product[];
  console.log(products)

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100">Products</h2>
        <Link to={'/product/new'} className="text-lg py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors ease-in-out">Agree product</Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
           <tr>
            <th className="p-2">Producto</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Disponibilidad</th>
            <th className="p-2">Acciones</th>
           </tr>
          </thead>
          <tbody>
            {products?.map((product)=>(<ProductDetails key={product.id} product={product}/>))}
            {products === null && <p className="text-center text-lg font-medium">No products</p>}
          </tbody>
        </table>
      </div>
    </>
  )
}
