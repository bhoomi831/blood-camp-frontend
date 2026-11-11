import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import Input from '../input/Input';
import Button from '../button/Button';

const SearchBar = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  onClear,
  debounceDelay = 300,
  showClearButton = true,
  showSearchButton = true,
  loading = false,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const inputRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Call onChange immediately if provided
    if (onChange) {
      onChange(value);
    }
  };

  // Debounce the search value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, debounceDelay]);

  // Set debounced value when external value changes
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setDebouncedValue('');
    if (onClear) {
      onClear();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`search-bar ${className}`}>
      <div className="input-group">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={loading}
          className="form-control"
          onKeyPress={handleKeyPress}
        />

        {showClearButton && inputValue && !loading && (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleClear}
            className="btn-outline-secondary"
            aria-label="Clear search"
          >
            ×
          </Button>
        )}

        {showSearchButton && !loading && (
          <Button
            variant="primary"
            size="sm"
            onClick={handleSearch}
            disabled={!debouncedValue.trim()}
          >
            Search
          </Button>
        )}

        {loading && (
          <Button variant="outline-primary" size="sm" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Searching...
          </Button>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  debounceDelay: PropTypes.number,
  showClearButton: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default SearchBar;