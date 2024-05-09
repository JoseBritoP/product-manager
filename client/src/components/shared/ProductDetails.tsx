import { deleteProduct } from "../../server/Product.endpoints";
import { Product } from "../../types";
import { formatCurrency } from "../../utils";
import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom";

interface ProductDetailProps {
 product:Product 
}

export async function action({params}:ActionFunctionArgs){
  await deleteProduct(params.id!)
  console.log(params.id)
  return redirect('/')
}


export default function ProductDetails({product}:ProductDetailProps) {

  const fetcher = useFetcher();
  const navigate = useNavigate()
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-center text-gray-800 dark:text-gray-50">
        {product.name}
      </td>
      <td className="p-3 text-center text-lg text-gray-800 dark:text-gray-200">
        {formatCurrency(product.price)}
      </td>
      <td className={`
        p-3 text-lg text-center font-medium
        ${product.inStock ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
        <fetcher.Form method="POST">
          <button name="id" value={product.id} className="rounded-lg p-2 text-sm font-bold uppercase border border-black-100 border-green-600 dark:border-green-200 dark:bg-green-100 px-3"> {product.inStock ? 'In Stock' : 'Out Stock'}</button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 dark:text-gray-200 ">
        <div className="flex gap-2 items-center w-full justify-between">
          <button onClick={()=>navigate(`/product/${product.id}/edit`)} className="text-sm text-center px-4 py-2 bg-indigo-600 text-gray-200 hover:bg-indigo-700 cursor-pointer rounded-md font-medium transition-colors duration-200 ease-in-out uppercase">Edit</button>
          <Form method="POST" action={`product/${product.id}/delete`}
            // onSubmit={(e)=>{
            //   if(!confirm('Delete?')){
            //     e.preventDefault();
            //   }
            // }}
          >
            <button onClick={()=>navigate(`/product/${product.id}/edit`)} className="text-sm text-center px-4 py-2 bg-red-600 text-red-200 dark:hover:text-red-900 transition-colors duration-200 ease-in-out hover:bg-red-700 cursor-pointer rounded-md font-medium">X</button>
          </Form>
        </div>
      </td>
    </tr> 
  )
}
