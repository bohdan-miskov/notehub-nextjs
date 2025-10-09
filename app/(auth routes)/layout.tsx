'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FullScreenLoader from '@/components/FullScreenLoader/FullScreenLoader';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  return <>{loading ? <FullScreenLoader text="Loading..." /> : children}</>;
}
