export function FavIcon({ color, setColor}) {
    return(
        <svg onClick={setColor} className={`right-6 top-4 h-[10%] absolute ${color ? "text-current" : "text-none"}  text-secondary dark:text-dark-bg`} viewBox="0 0 172 149" fill={color ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
        <path d="M5.16874 62.2632L85.3489 143.784C86.5397 144.995 88.4973 144.977 89.6654 143.744L166.958 62.1749C167.613 61.4832 167.903 60.5372 167.713 59.6036C165.937 50.9144 155.753 6.60316 132.348 4.11299C111.661 1.91213 98.3735 32.5854 87.5279 33.1118C75.6207 33.6897 64.8708 3.43717 44.7453 4.11299C20.2838 4.93442 6.86583 50.3481 4.412 59.4841C4.14312 60.4851 4.4419 61.5242 5.16874 62.2632Z" stroke="currentColor" strokeWidth="8"/>
        </svg>
    )
}