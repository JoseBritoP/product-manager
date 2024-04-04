import { PropsWithChildren } from "react";

export default function ErrorMessage({children}:PropsWithChildren) {
  return (
    <div className="text-center my-2 
    bg-red-400 text-red-900 
    dark:bg-red-800 dark:text-red-400 text-md 
    font-bold p-2 uppercase absolute 
    top-64 right-60 
    rounded-md">
      {children}
    </div>
  )
}
