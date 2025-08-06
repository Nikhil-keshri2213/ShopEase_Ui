import { useCallback, useState } from "react";

const colorSelector = {
    "Purple": "#800080",
    "Black": "#000000",
    "White": "#FFFFFF",
    "Gray": "#808080",
    "Grey": "#808080",   // Same as Gray
    "Blue": "#0000FF",
    "Red": "#FF0000",
    "Orange": "#FFA500",
    "Navy": "#000080",
    "Yellow": "#FFFF00",
    "Pink": "#FFC0CB",
    "Green": "#008000"
};

export const ColorFilter = ({ colors }) => {
    const [appliedColor, setAppliedColor] = useState([]);

    const onClickDiv = useCallback((item) => {
        setAppliedColor(prevColors => prevColors.includes(item) ? prevColors.filter(color => color !== item) : [...prevColors, item]);
    }, []);

    return (
        <div className='flex flex-col mb-4'>
            <p className='text-[16px] text-black mt-5'>Colors</p>
            <div className='flex flex-wrap p-4'>
                {colors?.map(item => (
                    <div key={item} className="flex flex-col items-center mr-4 mb-3">
                        <div className={`w-8 h-8 border rounded-xl cursor-pointer transition-transform duration-200 ${appliedColor.includes(item) ? 'outline outline-1 outline-black scale-110' : 'hover:scale-110'}`}onClick={() => onClickDiv(item)} style={{ background: colorSelector[item] || '#CCC' }}/>
                        <p className={`text-sm ${appliedColor.includes(item) ? 'text-black font-semibold' : 'text-gray-400'}`}>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
