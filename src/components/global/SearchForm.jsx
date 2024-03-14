import { useState, useEffect } from 'react';

export default function SearchForm({ searchId, onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue && searchValue.length > 2) {
        onSearch(searchValue);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, onSearch]);

  return (
    <form className='border-b border-slate-200 dark:border-slate-700'>
      <div className='relative'>
        <label htmlFor={searchId} className='sr-only'>
          Search
        </label>
        <input
          id={searchId}
          className='w-full dark:text-slate-300 bg-white dark:bg-slate-800 border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none py-3 pl-10 pr-4'
          type='search'
          placeholder='Search Players...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className='absolute inset-0 right-auto group' type='submit' aria-label='Search'>
          <svg
            className='w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2'
            viewBox='0 0 16 16'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z' />
            <path d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z' />
          </svg>
        </button>
      </div>
    </form>
  );
}
