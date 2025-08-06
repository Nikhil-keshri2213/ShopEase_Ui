import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './PriceFilter.css'

export const PriceFilter = () => {
  const [range, setRange] = useState({
    min: 100,
    max: 500
  });

  return (
    <div>
      <p className='text-[16px] text-black mt-5 mb-5'>Price</p>

      <RangeSlider
        className={'custom-range-slider'}
        min={0}
        max={5000}
        defaultValue={[range.min, range.max]}
        onInput={(value) =>
          setRange({
            min: value[0],
            max: value[1]
          })
        }
      />

      <div className='flex justify-between'>
        <input
          type='text'
          value={`₨ ${range?.min}`}
          readOnly
          placeholder='min'
          className='border rounded-lg w-[80px] mt-4 p-2 text-center'
        />
        <input
          type='text'
          value={`₨ ${range?.max}`}
          readOnly
          placeholder='max'
          className='border rounded-lg w-[80px] mt-4 p-2 text-center'
        />
      </div>
    </div>
  );
};
