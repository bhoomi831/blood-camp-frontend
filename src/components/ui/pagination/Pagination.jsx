import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({
  page = 1,
  totalPages = 1,
  siblingCount = 1,
  boundaryCount = 1,
  onPageChange,
  className = '',
}) => {
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = () => {
    const totalPagesCount = boundaryCount + siblingCount * 2 + 3;
    const totalPagesNumbers = range(1, totalPages);

    if (totalPagesCount >= totalPages) return totalPagesNumbers;

    const leftSiblingIndex = Math.max(page - siblingCount, boundaryCount + 2);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages - boundaryCount - 1);

    const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItems = range(1, boundaryCount + siblingCount + 1);
      let rightItems = [totalPages];
      return [...leftItems, 'DOTS', ...rightItems];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let leftItems = [1];
      let rightItems = range(totalPages - boundaryCount - siblingCount, totalPages);
      return [...leftItems, 'DOTS', ...rightItems];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleItems = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'DOTS', ...middleItems, 'DOTS', totalPages];
    }

    return [];
  };

  const rangeWithDots = paginationRange();

  const renderButton = (pageNumber, isActive) => {
    if (pageNumber === 'DOTS') {
      return (
        <span className="page-link dots" key={`dots-${pageNumber}`}>
          …
        </span>
      );
    }

    const isCurrentPage = pageNumber === page;

    return (
      <button
        type="button"
        className={`page-link ${isCurrentPage ? 'active' : ''}`}
        key={pageNumber}
        onClick={() => onPageChange && onPageChange(pageNumber)}
        disabled={isCurrentPage}
        aria-label={`Go to page ${pageNumber}`}
      >
        {pageNumber}
      </button>
    );
  };

  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages;

  return (
    <nav className={`pagination ${className}`} aria-label="Page navigation">
      <ul className="pagination-list">
        <li className="page-item">
          <button
            type="button"
            className="page-link prev"
            onClick={() => !prevDisabled && onPageChange && onPageChange(page - 1)}
            disabled={prevDisabled}
            aria-label="Previous page"
          >
            ‹
          </button>
        </li>

        {rangeWithDots.map((pageNumber, index) => (
          <li className="page-item" key={index}>
            {renderButton(pageNumber, pageNumber === page)}
          </li>
        ))}

        <li className="page-item">
          <button
            type="button"
            className="page-link next"
            onClick={() => !nextDisabled && onPageChange && onPageChange(page + 1)}
            disabled={nextDisabled}
            aria-label="Next page"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  siblingCount: PropTypes.number,
  boundaryCount: PropTypes.number,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
};

Pagination.defaultProps = {
  page: 1,
  totalPages: 1,
  siblingCount: 1,
  boundaryCount: 1,
  onPageChange: null,
  className: '',
};

export default Pagination;