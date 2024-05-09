import { Link } from "react-router-dom"
import Form from "../components/Form/Form"

export default function ProductForm() {
  return (
    <>
      <section className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100">Products</h2>
        <Link to={'/'} className="text-lg py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-all duration-300 ease-in-out font-semibold  hover:scale-105" aria-label="See products">See Products</Link>
      </section>
      <Form/>
    </>
  )
}
