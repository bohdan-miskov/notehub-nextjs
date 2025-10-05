import { TAGS_ARRAY } from '@/constants';
import css from './TagsMenu.module.css';
import Link from 'next/link';

export default function TagsMenu() {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {['all', ...TAGS_ARRAY].map((tag, index) => (
          <li className={css.menuItem} key={`tags-menu-item-${index}`}>
            <Link href={`/notes/filters/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
