import RectanguleImageComponent from "../assets/RectanguleIcon.jsx"
import { initTheme } from '../tools/theme';

export function HeaderBorder () {
    initTheme();

    return (
        <div className="w-[14rem] flex justify-between text-tertiary  dark:text-dark-tertiary text-lg">
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
            <RectanguleImageComponent/>
        </div>
    )
}