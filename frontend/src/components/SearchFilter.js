import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch, onFilter, onSort, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-filter-bar">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-controls">
        <select onChange={(e) => onFilter(e.target.value)} className="filter-select">
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select onChange={(e) => onSort(e.target.value)} className="filter-select">
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
