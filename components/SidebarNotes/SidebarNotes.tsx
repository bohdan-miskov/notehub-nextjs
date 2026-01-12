'use client';

import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { ActiveLink } from '../ActiveLink/ActiveLink';
import { getTags } from '@/lib/api/clientApi/noteApi';
import { useQuery } from '@tanstack/react-query';
import { TAGS_QUERY_KEY } from '@/constants';

export default function SidebarNotes() {
  const { data: tags = [] } = useQuery({
    queryKey: [TAGS_QUERY_KEY],
    queryFn: getTags,
  });
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.scrollTop = 0;
  };
  return (
    <div className={css.sidebarContainer} onMouseLeave={handleMouseLeave}>
      <h2 className={css.sidebarTitle}>Tags</h2>
      <Link
        href="/notes/action/create"
        className={css.createLink}
        aria-label="Create note"
      >
        <span className={css.createIcon} aria-hidden>
          ＋
        </span>
        <span className={css.createText}>Create note</span>
      </Link>

      <ul className={css.menuList}>
        {['All', ...tags].map((tag, index) => (
          <li className={css.menuItem} key={`tags-menu-item-${index}`}>
            <ActiveLink
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
              activeClassName={css.active}
            >
              <span>{tag}</span>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
