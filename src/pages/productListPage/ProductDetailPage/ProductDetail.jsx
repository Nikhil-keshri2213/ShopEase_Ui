import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

export const ProductDetail = () => {
    const {product} = useLoaderData();

  return (
    <div className='flex flex-col md:flex-row p-10'>
        <div className='w-[100%] lg:w-[50%] md:w-[40%]'>
            {/* Image */}
            <div className='flex flex-col md:flex-row p-10'>
                <div className='w-[100%] md:w-[30%]'>
                    {/* Stack Image */}
                    <p>helloo stack</p>
                </div>
                <div className='w-[70%]'>
                    <p>img hello</p>
                </div>
            </div>
        </div>
        <div className='w-[60%]'>
            {/* Product Description */}

        </div>
    </div>
  )
}
