import React, { useState } from 'react';

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handleClick(1)}
          className={currentPage === 1 ? 'active' : ''}
        >
          1
        </button>
      );
      if (currentPage > 3) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination