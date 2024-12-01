import styles from '@/styles/PageStyle.module.css';
import News from '../../components/posts';

export default function PostPage() {
  return (
    <div className={styles.container}>
     <News/>
    </div>
  );
}
