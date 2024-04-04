import { Product } from "../../types";
import { formatCurrency } from "../../utils";

interface ProductDetailProps {
 product:Product 
}
export default function ProductDetails({product}:ProductDetailProps) {

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
        ${product.inStock ? 'text-emerald-400 dark:text-emerald-500' : 'text-red-400 dark:text-red-500'} 
        text-gray-800 
        dark:text-gray-200
      `}>
        {product.inStock ? 'In Stock' : 'Out Stock'}
      </td>
      <td className="p-3 text-lg text-gray-800 dark:text-gray-200 flex justify-between items-center gap-x-4 ">
        <button>X</button>
        <button>E</button>
        <button>P</button>
      </td>
    </tr> 
  )
}
