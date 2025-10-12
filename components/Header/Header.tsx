import Link from 'next/link';
import css from './Header.module.css';
import { ActiveLink } from '../ActiveLink/ActiveLink';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Link href="/" aria-label="Home">
          NoteHub
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <ActiveLink href="/" activeClassName={css.active}>
                Home
              </ActiveLink>
            </li>

            <TagsMenu />

            <AuthNavigation activeClassName={css.active} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
