import { Link } from "react-router-dom"

export default function Products() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-100">Products</h2>
        <Link to={'/product/new'} className="text-lg py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors ease-in-out">Agree product</Link>
      </div>
    </>
  )
}
