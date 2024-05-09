import { Link, Outlet } from "react-router-dom"
import DarkMode from "../components/shared/DarkMode"
export default function Home() {
  return (
    <>
      <header className="bg-slate-500 dark:bg-slate-950 border-b-2 border-b-black dark:border-b-gray-300 shadow-md dark:shadow-sm dark:shadow-gray-500">
        <div className="flex justify-between items-center px-10 mx-auto max-w-6xl py-5">
          <Link aria-label="App title" to='/' className="text-3xl font-bold text-white" >Product Manager</Link>
          <DarkMode/>
        </div>
      </header>
      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow dark:bg-slate-600 rounded-sm">
        <Outlet/>
      </main>
    </>
  )
}
