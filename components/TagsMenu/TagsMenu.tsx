'use client';

import { TAGS_ARRAY } from '@/constants';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { useAuthStore } from '@/lib/stores/authStore';

export default function TagsMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  function onToggleMenu() {
    if (!isMenuOpen) {
      document.addEventListener('click', handleCloseMenu);
    }
    setIsMenuOpen(prevIsOpen => !prevIsOpen);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
    document.removeEventListener('click', handleCloseMenu);
  }

  return (
    isAuthenticated && (
      <li>
        <div className={css.menuContainer}>
          <button className={css.menuButton} onClick={onToggleMenu}>
            Notes ▾
          </button>
          <ul className={clsx(isMenuOpen && css.isOpen, css.menuList)}>
            {['All', ...TAGS_ARRAY].map((tag, index) => (
              <li className={css.menuItem} key={`tags-menu-item-${index}`}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    )
  );
}
