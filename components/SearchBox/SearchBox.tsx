import { ChangeEvent, useEffect, useState } from 'react';
import css from './SearchBox.module.css';
import { useDebounce } from 'use-debounce';

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export default function SearchBox({ search, setSearch }: Props) {
  const [query, setQuery] = useState(search);
  const [queryDebounce] = useDebounce(query, 500);

  useEffect(() => {
    setSearch(queryDebounce.trim().toLowerCase());
  }, [queryDebounce, setSearch]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
  }

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={query}
      onChange={onChange}
    />
  );
}
