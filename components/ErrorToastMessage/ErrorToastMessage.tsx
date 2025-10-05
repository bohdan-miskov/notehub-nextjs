import { useEffect } from 'react';
import toast from 'react-hot-toast';

export type Props = {
  children: string;
  duration?: number;
};

const toastStyleOptions = {
  background: '#1e1e2f',
  color: '#fff',
  border: '1px solid #ef4444',
  padding: '12px 16px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: '500',
  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
};

const toastIconThemeOptions = {
  primary: '#ef4444',
  secondary: '#fff',
};

export default function ErrorToastMessage({
  children,
  duration = 5000,
}: Props) {
  useEffect(() => {
    if (!children) return;
    const delay = 300;
    let timer: ReturnType<typeof setTimeout> | null = null;

    timer = setTimeout(() => {
      if (children) {
        toast.error(String(children), {
          duration,
          style: toastStyleOptions,
          iconTheme: toastIconThemeOptions,
        });
      }
    }, delay);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [children, duration]);

  return null;
}
