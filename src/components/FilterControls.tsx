import React from 'react';
import { SortOption } from '@/types/github';

interface FilterControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function FilterControls({
  sortBy,
  onSortChange,
  languages,
  selectedLanguage,
  onLanguageChange,
}: FilterControlsProps) {
  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="filter-select"
        >
          <option value="stars">Stars</option>
          <option value="updated">Last Updated</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="language-select" className="filter-label">
          Filter by Language:
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
