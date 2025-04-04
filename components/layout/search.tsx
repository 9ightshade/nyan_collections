'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('books');
  const router = useRouter();

const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (query.trim()) {
        router.push(`/${searchType}?search=${encodeURIComponent(query)}`);
    }
};

  return (
    <form onSubmit={handleSearch} className="flex w-full">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="px-3 py-2 bg-gray-100 border-r-0 border-gray-300 rounded-l-md focus:outline-none"
      >
        <option value="books">Books</option>
        <option value="authors">Authors</option>
        <option value="genres">Genres</option>
      </select>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 border-l-0 border-blue-600 rounded-r-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}