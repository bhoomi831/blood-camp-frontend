import React from 'react';
import './Table.css';

const Table = ({ 
  columns = [], 
  data = [], 
  loading = false,
  emptyState = null,
  striped = false,
  bordered = false,
  hover = false,
  responsive = true,
  ...props
}) => {
  if (loading) {
    return <div className="table-loading">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="table-empty">{emptyState || <p>No data available</p>}</div>;
  }

  return (
    <div className={responsive ? 'table-responsive' : ''}>
      <table className={`table${striped ? ' table-striped' : ''}${bordered ? ' table-bordered' : ''}${hover ? ' table-hover' : ''}`}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} {...column.thProps}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => {
                const cellValue = column.accessor ? row[column.accessor] : null;
                return (
                  <td key={colIndex} {...column.tdProps}>
                    {column.render ? column.render(cellValue, row) : cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
