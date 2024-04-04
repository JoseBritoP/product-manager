import { useThemeValue } from "../../hooks/useDarkThemeValue"

export default function DarkMode() {
  const { value, handleChangeTheme } = useThemeValue();
  return (
    <button onClick={handleChangeTheme} className="self-center py-4 px-2 text-center font-bold text-slate-900 dark:text-slate-200 focus:text-sky-900 active:text-sky-900 hover:cursor-pointer">
      {value}
    </button>
  )
}
