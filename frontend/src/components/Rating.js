import React from 'react';

const Rating = ({ value, text }) => {
  const rating = value.toString().split('.');

  return (
    <div className=''>
      {[...Array(parseInt(rating[0]))].map((value, index) => (
        <span className='inline-block align-top text-orange-300' key={index}>
          <i className='ri-star-fill'></i>
        </span>
      ))}
      {value < 5.0 && (
        <span className='inline-block align-top text-orange-300'>
          <i
            className={`${
              parseInt(rating[1]) > 0 ? 'ri-star-half-line' : 'ri-star-line'
            }`}
          ></i>
        </span>
      )}
      <div className='text-white'>
        {value}/5 from {text}
      </div>
    </div>
  );
};

export default Rating;
