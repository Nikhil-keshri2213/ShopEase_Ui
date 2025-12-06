import React from 'react'
import ArrowIcon from '../common/ArrowIcon.jsx'
import { useNavigate } from 'react-router-dom'

const Card = ({ imagePath, title, description, actionArrow, height = "220px", width = "200px" , titleLinks}) => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer w-fit">
      
      {/* Image */}
      <div className="overflow-hidden rounded-xl" onClick={() => navigate(titleLinks)}>
        <img
          src={imagePath}
          alt={title}
          style={{ height: height, width: width }}
          className="object-cover rounded-xl transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{title}</p>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>

        {actionArrow && (
          <span className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => navigate(titleLinks)}>
            <ArrowIcon />
          </span>
        )}
      </div>
    </div>
  )
}

export default Card
