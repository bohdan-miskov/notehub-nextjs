'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type Props = {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
};

export function ActiveLink({
  href,
  children,
  activeClassName,
  className,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={clsx(isActive && activeClassName, className)}>
      {children}
    </Link>
  );
}
