import React from 'react';

const Loader = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center h-1/2 animate-pulse'>
      <svg
        className='animate-spin h-10 w-10 bg-transparent border-4  border-blue-600'
        viewBox='0 0 24 24'
      ></svg>
      <p className='mt-8 text-2xl'>Loading</p>
    </div>
  );
};

export default Loader;
