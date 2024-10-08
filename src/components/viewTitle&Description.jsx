import { initTheme } from "../tools/theme"

// eslint-disable-next-line react/prop-types
export function ViewTitleAndDescription ({title, description}) {
    initTheme()
    return (
        <div className="w-[80%] h-[100%] flex flex-col justify-between relative">
            <h2 className="text-lg text-[#9D1A1A] dark:text-dark-bg">{title}</h2>
            <p className="text-sm font-light ml-1 text-[#9D1A1A] dark:text-dark-bg">{description}</p>
        </div>
    )
}