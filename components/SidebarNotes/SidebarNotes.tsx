import { TAGS_ARRAY } from '@/constants';
import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  return (
    <div className={css.sidebarContainer}>
      <h2 className={css.sidebarTitle}>Tags</h2>
      <ul className={css.menuList}>
        {['all', ...TAGS_ARRAY].map((tag, index) => (
          <li className={css.menuItem} key={`tags-menu-item-${index}`}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              <span>{tag}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
