import React, { useMemo } from 'react';
import SvgStarIcon from '../Common/SvgStarIcon.jsx';
import SvgEmptyStar from '../Common/SvgEmptyStar.jsx'

const Rating = ({ rating }) => {
  const ratingNumber = useMemo(() => {
    return Array(Math.round(Number(rating))).fill(null);
  }, [rating]);

  return (
    <div className='flex items-center'>
      {ratingNumber.map((_, index) => (
        <SvgStarIcon key={index} />
      ))}
      {
        Array(5-ratingNumber?.length).fill().map((_,index)=>(
          <SvgEmptyStar key={'empty-'+index}/>
        ))
      }
      <p className='px-2 text-gray-500'>{rating}</p>
    </div>
  );
};

export default Rating;
