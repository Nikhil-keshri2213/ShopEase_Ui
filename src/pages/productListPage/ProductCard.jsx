import React from 'react'
import SvgFavourite from '../../components/Common/SvgFavourite'
import { Link } from 'react-router-dom'

export const ProductCard = ({id, title, description, price, discount, rating, brand, thumbnail }) => {
  return (
    <div className='relative flex flex-col hover:scale-105 transition-transform duration-300 w-[280px]'>
      <Link to={`/products/${id}`}>
      {/* Image */}
      <img
        className='h-[320px] w-[280px] border rounded-lg object-cover block'
        src={thumbnail}
        alt={title}
      />
      </Link>

      {/* Product Info */}
      <div className='flex justify-between items-center mt-2'>
        <div className='flex flex-col'>
          <p className='text-[16px] font-semibold'>{title}</p>
          {brand && <p className='text-[12px] text-gray-600'>{brand}</p>}
        </div>
        <div>
            <p className='text-[14px] font-medium'>${price}</p>
        </div>
        {/* Favourite Icon */}
      <button onClick={()=> console.log("Favourite")} className='absolute top-2 right-2 z-10 pt-2 pr-2 cursor-pointer'>
        <SvgFavourite />
      </button>
      </div>
    </div>
  )
}

export default ProductCard
