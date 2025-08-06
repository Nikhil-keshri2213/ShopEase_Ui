import React, { useState, useCallback } from 'react';

export const SizeFilter = ({ sizes }) => {
  const [appliedSize, setAppliedSize] = useState([]);

  const onClickDiv = useCallback((item) => {
    setAppliedSize(prevSize =>
      prevSize.includes(item)
        ? prevSize.filter(size => size !== item)
        : [...prevSize, item]
    );
  }, []);

  return (
    <div className='flex flex-col mb-4'>
      <p className='text-[16px] text-black mt-5'>Sizes</p>
      <div className='flex flex-wrap p-4'>
        {sizes?.map(item => (
          <div key={item} className="flex flex-col mr-2">
            <div
              className={`w-12 h-8 border rounded-lg mr-4 mb-2 cursor-pointer hover:scale-110 text-center flex items-center justify-center ${
                appliedSize.includes(item)
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-500 border-black'
              }`}
              onClick={() => onClickDiv(item)}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
