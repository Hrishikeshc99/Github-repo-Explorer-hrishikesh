import React, { useState, useCallback } from 'react';
import { debounce } from '@/utils/helpers';

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter GitHub username..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
}
