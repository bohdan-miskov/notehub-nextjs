import { ClipLoader } from 'react-spinners';
import styles from './FullScreenLoader.module.css';

export type Props = {
  text: string;
};

export default function FullScreenLoader({ text }: Props) {
  return (
    <div className={styles.overlay}>
      <div className="container">
        <div className={styles.container}>
          <ClipLoader color="#3470ff" size={100} />
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </div>
  );
}
