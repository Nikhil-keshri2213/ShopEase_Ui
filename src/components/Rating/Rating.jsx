// import React, { useMemo } from 'react';
// import SvgStarIcon from '../Common/SvgStarIcon.jsx';
// import SvgEmptyStar from '../Common/SvgEmptyStar.jsx'

// const Rating = ({ rating }) => {
//   const ratingNumber = useMemo(() => {
//     return Array(Math.round(Number(rating))).fill(null);
//   }, [rating]);

//   return (
//     <div className='flex items-center'>
//       {ratingNumber.map((_, index) => (
//         <SvgStarIcon key={index} />
//       ))}
//       {
//         Array(5-ratingNumber?.length).fill().map((_,index)=>(
//           <SvgEmptyStar key={'empty-'+index}/>
//         ))
//       }
//       <p className='px-2 text-gray-500'>{rating}</p>
//     </div>
//   );
// };

// export default Rating;

import React, { useMemo } from "react";
import SvgStarIcon from "../Common/SvgStarIcon.jsx";
import SvgEmptyStar from "../Common/SvgEmptyStar.jsx";

const Rating = ({ rating }) => {
  // Ensure rating is always a valid number between 0–5
  const safeRating = useMemo(() => {
    const num = Number(rating);

    if (isNaN(num) || num < 0) return 0; // fallback to 0
    if (num > 5) return 5;               // cap at 5
    return Math.round(num);              // round to nearest integer
  }, [rating]);

  // Filled and empty stars
  const filledStars = Array.from({ length: safeRating });
  const emptyStars = Array.from({ length: 5 - safeRating });

  return (
    <div className="flex items-center">
      {/* Filled Stars */}
      {filledStars.map((_, index) => (
        <SvgStarIcon key={index} />
      ))}

      {/* Empty Stars */}
      {emptyStars.map((_, index) => (
        <SvgEmptyStar key={`empty-${index}`} />
      ))}

      {/* Show rating number */}
      <p className="px-2 text-gray-500">{rating ?? 0}</p>
    </div>
  );
};

export default Rating;
