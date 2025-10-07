import { TAGS_ARRAY } from '@/constants';
import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { ActiveLink } from '../ActiveLink/ActiveLink';

export default function SidebarNotes() {
  return (
    <div className={css.sidebarContainer}>
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
        {['all', ...TAGS_ARRAY].map((tag, index) => (
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
