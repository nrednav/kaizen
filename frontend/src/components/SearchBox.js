import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <div className=''>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search products'
          className='py-2 px-4 w-full sm:w-auto appearance-none border focus:outline-none'
        />
        <button
          type='submit'
          className='hidden sm:inline-block ml-4 px-4 py-2 text-white uppercase border-2 border-white hover:bg-white hover:text-black'
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
