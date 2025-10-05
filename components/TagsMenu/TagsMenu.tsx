'use client';

import { TAGS_ARRAY } from '@/constants';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

export default function TagsMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onToggleMenu() {
    setIsMenuOpen(prevIsOpen => !prevIsOpen);
  }
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={onToggleMenu}>
        Notes ▾
      </button>
      <ul className={clsx(isMenuOpen && css.isOpen, css.menuList)}>
        {['all', ...TAGS_ARRAY].map((tag, index) => (
          <li className={css.menuItem} key={`tags-menu-item-${index}`}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
