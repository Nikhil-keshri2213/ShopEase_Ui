import React from 'react';

const ProductColors = ({ colors = [] }) => {
  return (
    <div className="flex gap-5 px-2 pt-2">
      {colors.map((color, index) => (
        <label key={index} className="cursor-pointer">
          <input type="radio" name="selectColor" value={color?.toLowerCase()}
            className="hidden peer"/>
            <div className="rounded-full w-6 h-6 border border-gray-300 peer-checked:ring-2 peer-checked:ring-offset-1"
                style={{ backgroundColor: color }}>
            </div>
        </label>
      ))}
    </div>
  );
};

export default ProductColors;
