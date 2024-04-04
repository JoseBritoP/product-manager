import { Link } from "react-router-dom"
import EditForm from "../components/Form/EditProducFormt"

export default function EditProductForm() {
  return (
    <>
      <section className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100">Edit Product</h2>
        <Link to={'/'} className="text-lg py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors ease-in-out">See Product</Link>
      </section>
      <EditForm/>
    </>
  )
}
