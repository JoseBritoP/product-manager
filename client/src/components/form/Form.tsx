import { ActionFunctionArgs, Form, useActionData } from 'react-router-dom'
import ErrorMessage from '../shared/ErrorMessage';
import { addProduct } from '../../server/Product.endpoints';

export async function action({request}:ActionFunctionArgs){
  const form = await request.formData()
  const data = Object.fromEntries(form);

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

  addProduct(data);

  return null
}

export default function FormPage() {

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
              />
        </div>
          <input
            type="submit"
            className="mt-5 w-full bg-indigo-700 hover:bg-indigo-800 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Create product"
            />
        </legend>
    </Form>
  )
}
