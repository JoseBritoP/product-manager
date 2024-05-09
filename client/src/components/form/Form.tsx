import { ActionFunctionArgs, Form, useActionData,redirect } from 'react-router-dom'
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

  await addProduct(data);
  return redirect('/')
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
          <label className="text-gray-800 text-xl dark:text-gray-200" htmlFor="name">Product Name:</label>
          <input 
              id="name"
              type="text"
              className="mt-2 block  w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-md dark:placeholder:text-slate-100 "
              placeholder="Product name..."
              name="name"
              aria-label='Product name'
              />
        </div>
        <div className="mb-4">
          <label className="text-gray-800 text-xl dark:text-gray-200" htmlFor="price">Price:</label>
          <input 
              id="price"
              type="number"
              aria-label='Product price'
              className="mt-2 block  w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-md dark:placeholder:text-slate-100 "
              placeholder="Price: 399..."
              name="price"
              />
        </div>
          <input
            type="submit"
            aria-label='Create Product'
            className="mt-5 w-full bg-indigo-700 transition-colors duration-300 ease-in-out bg-gradient-to-b hover:bg-indigo-800 p-2 text-white font-bold text-lg cursor-pointer rounded py-3"
            value="Create product"
            />
        </legend>
    </Form>
  )
}
