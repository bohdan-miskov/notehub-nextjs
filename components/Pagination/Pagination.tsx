import css from './Pagination.module.css';
import calcPaginArray from '@/utils/calcPaginArray';
import clsx from 'clsx';

type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export default function Pagination({ page, totalPages, setPage }: Props) {
  const paginArray = calcPaginArray(page, totalPages);
  function handleClick(page: number) {
    setPage(page);
  }

  return (
    paginArray.length > 1 && (
      <nav aria-label="Pagination">
        <ul>
          {paginArray.map(num => (
            <li key={`pag-${num}`}>
              <button
                className={clsx(num === page && css.isActive)}
                disabled={num === page}
                onClick={() => handleClick(num)}
              >
                {num}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
}
