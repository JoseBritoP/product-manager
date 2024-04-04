import { ActionFunctionArgs, Form, useActionData,redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../shared/ErrorMessage';
import { editProduct, getProductById } from '../../server/Product.endpoints';
import { Product } from '../../types';

export async function loader({params}:LoaderFunctionArgs){
  const product = await getProductById(params.id!);
  // if(!product) throw new Response('',{status:404,statusText:'Product not found'})
  if(!product) {
    return redirect('/')
  }
  return product
}

export async function action({request,params}:ActionFunctionArgs){
  const form = await request.formData()
  const data = Object.fromEntries(form);
  console.log(data)

  let error = '';
  if(Object.values(data).includes('')){
    error = 'All fields are required'
  }
  if(error.length){
    setTimeout(()=>{
      error=''
    },2000)
    return error
  }

  await editProduct(params.id!,data);
  return redirect('/')
}


export default function EditForm() {

  const product = useLoaderData() as Product;
  const error = useActionData() as string;

  return (
    <Form
      method='POST'
    >
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <legend className="mt-10 ">
        <div className="mb-4">
          <label className="text-gray-800 dark:text-gray-200" htmlFor="name">Product Name:</label>
          <input 
              id="name"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-100 dark:bg-gray-400 rounded-md dark:placeholder:text-slate-200"
              placeholder="Product name..."
              name="name"
              defaultValue={product.name}
              />
        </div>
        <div className="mb-4">
          <label className="text-gray-800 dark:text-gray-200" htmlFor="price">Price:</label>
          <input 
              id="price"
              type="number"
              className="mt-2 block w-full p-3 bg-gray-50 dark:bg-gray-400 dark:placeholder:text-slate-200 rounded-md"
              placeholder="Price: 399..."
              name="price"
              defaultValue={product.price}
              />
        </div>
        <div className='flex justify-between items-center gap-x-20'>
          <input
            type="submit"
            className="mt-5 w-full bg-green-700 hover:bg-green-800 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Save changes"
            />
          <button className='mt-5 w-full bg-red-700 hover:bg-red-800 p-2 text-white font-bold text-lg cursor-pointer rounded' >X</button>
        </div>
      </legend>
    </Form>
  )
}
