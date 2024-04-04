import { deleteProduct, inStockProduct } from "../../server/Product.endpoints";
import { Product } from "../../types";
import { formatCurrency } from "../../utils";
import { ActionFunctionArgs, Form, useNavigate, redirect } from "react-router-dom";

interface ProductDetailProps {
 product:Product 
}

export async function action({params}:ActionFunctionArgs){
  await deleteProduct(params.id!)
  console.log('Deleting...')
  console.log(params.id)
  return redirect('/')
}


export default function ProductDetails({product}:ProductDetailProps) {

  const handleInStock = (id:string) => {
    inStockProduct(id);
  };

  const navigate = useNavigate()
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-center text-gray-800 dark:text-gray-50">
        {product.name}
      </td>
      <td className="p-3 text-center text-lg text-gray-800 dark:text-gray-200">
        {formatCurrency(product.price)}
      </td>
      <td onClick={()=>handleInStock(product.id)} className={`
        p-3 text-lg text-center font-medium
        ${product.inStock ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'} `}>
        {product.inStock ? 'In Stock' : 'Out Stock'}
      </td>
      <td className="p-3 text-lg text-gray-800 dark:text-gray-200 ">
        <div className="flex gap-2 items-center w-full justify-between">
          <button onClick={()=>navigate(`/product/${product.id}/edit`)} className="text-sm text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 cursor-pointer rounded-md font-medium">Edit</button>
          <Form method="POST" action={`product/${product.id}/delete`}
            // onSubmit={(e)=>{
            //   if(!confirm('Delete?')){
            //     e.preventDefault();
            //   }
            // }}
          >
            <button onClick={()=>navigate(`/product/${product.id}/edit`)} className="text-sm text-center px-4 py-2 bg-red-600 hover:bg-red-700 cursor-pointer rounded-md font-medium">X</button>
          </Form>
        </div>
      </td>
    </tr> 
  )
}
