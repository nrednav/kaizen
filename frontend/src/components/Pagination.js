import React from 'react';
import { useHistory } from 'react-router-dom';

const Pagination = ({ pages, page, keyword, isAdmin = false }) => {
  const history = useHistory();

  const goToPageHandler = (pageNumber) => {
    history.push(
      keyword
        ? `/search/${keyword}/page/${pageNumber + 1}`
        : `/page/${pageNumber + 1}`
    );
  };

  return (
    pages > 1 && (
      <div className='flex flex-row justify-start py-2 mx-20'>
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => goToPageHandler(x)}
            className={`bg-transparent px-4 py-2 my-2 mx-1 focus:outline-none text-lg transition-colors ${
              x + 1 === page
                ? 'bg-gray-800 text-white'
                : 'hover:bg-gray-800 hover:text-white'
            }`}
          >
            {x + 1}
          </button>
        ))}
      </div>
    )
  );
};

export default Pagination;
