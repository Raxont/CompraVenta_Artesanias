export function DescuentoComponent ({style, gStyle, xNumber, yNumber, text, text2}) {
    return (
        <svg className={style} viewBox="0 0 285 283" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className={gStyle} filter="url(#filter0_d_98_86)">
        <path fillRule="evenodd" clipRule="evenodd" d="M89.7528 74.8278C90.9859 74.5843 92.0414 73.7862 92.6116 72.6661L106.403 45.576C107.399 43.6198 109.765 42.7933 111.748 43.7092L139.246 56.4141C140.379 56.9376 141.695 56.9075 142.812 56.3326L169.691 42.501C171.639 41.4984 174.02 42.2083 175.077 44.1068L189.785 70.5247C190.388 71.6071 191.458 72.3491 192.687 72.5375L222.913 77.1664C225.077 77.4978 226.571 79.4864 226.287 81.6573L222.366 111.645C222.204 112.889 222.627 114.133 223.513 115.014L244.757 136.144C246.299 137.678 246.335 140.165 244.838 141.768L224.161 163.912C223.303 164.83 222.916 166.088 223.111 167.321L227.844 197.24C228.185 199.397 226.745 201.449 224.592 201.874L194.744 207.769C193.511 208.012 192.455 208.811 191.885 209.931L178.082 237.044C177.086 239 174.72 239.826 172.737 238.91L145.239 226.205C144.106 225.682 142.79 225.712 141.673 226.287L114.733 240.15C112.783 241.153 110.4 240.441 109.344 238.54L94.6821 212.128C94.08 211.044 93.0089 210.3 91.7777 210.111L61.9411 205.542C59.7865 205.212 58.2942 203.238 58.5636 201.075L62.2954 171.122C62.4494 169.886 62.0255 168.653 61.1459 167.778L39.7277 146.475C38.1857 144.942 38.1499 142.455 39.6467 140.852L60.3595 118.67C61.217 117.752 61.6045 116.494 61.4095 115.261L56.678 85.3517C56.3367 83.1947 57.7768 81.1428 59.9303 80.7175L89.7528 74.8278Z" fill="currentColor"/>
        </g>
        <text x={xNumber} y={yNumber} fontSize="50" fill="white">
            <tspan dy="0em">{text}</tspan>
            <tspan x="70" dy="1em">{text2}</tspan>
        </text>
        <defs>
        <filter id="filter0_d_98_86" x="34.5469" y="42.0469" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_98_86"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_98_86" result="shape"/>
        </filter>
        </defs>
        </svg>
    )
}