'use client';

import { ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    ReactModal.setAppElement('#__next');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      setIsMounted(false);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isMounted) return null;

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      parentSelector={() => document.getElementById('modal-root')!}
      className={{
        base: css.modal,
        afterOpen: css['modal--after-open'],
        beforeClose: css['modal--before-close'],
      }}
      overlayClassName={{
        base: css.overlay,
        afterOpen: css['overlay--after-open'],
        beforeClose: css['overlay--before-close'],
      }}
      closeTimeoutMS={250}
    >
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Закрити модалку"
      >
        <svg
          width="24"
          height="24"
          className={css.closeIcon}
          aria-hidden="true"
        >
          <use href="/icons.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.content}>{children}</div>
    </ReactModal>
  );
}
