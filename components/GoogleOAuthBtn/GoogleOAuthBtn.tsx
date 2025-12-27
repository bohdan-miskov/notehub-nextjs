'use client';

import { useEffect, useState } from 'react';
import styles from './GoogleOAuthBtn.module.css';
import SmallLoader from '../SmallLoader/SmallLoader';
import { getGoogleOAuth } from '@/lib/api/clientApi/authApi';
export default function GoogleOAuthBtn() {
  const [oAuthUrl, setOAuthUrl] = useState<string | null>(null);

  useEffect(() => {
    async function setUrl() {
      const url = await getGoogleOAuth();
      setOAuthUrl(url);
    }
    setUrl();
  }, [setOAuthUrl]);

  return oAuthUrl ? (
    <div className={styles.wrapper}>
      <a href={oAuthUrl} className={styles.googleBtn}>
        <svg className={styles.googleIcon}>
          <use href="/icons.svg#icon-google" />
        </svg>
        <span className={styles.btnText}>Sign in with Google</span>
      </a>
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <SmallLoader />
    </div>
  );
}
