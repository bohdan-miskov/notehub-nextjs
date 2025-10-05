import { TAGS_ARRAY } from '@/constants';
import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  return (
    <>
      <h2>SidebarNotes</h2>
      <ul className={css.menuList}>
        {['all', ...TAGS_ARRAY].map((tag, index) => (
          <li className={css.menuItem} key={`tags-menu-item-${index}`}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
