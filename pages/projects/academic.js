import styles from '@/styles/PageStyle.module.css';
import Projects from '../../components/projects';

export default function AcademicProjectsPage() {
  return (
    <div className={styles.container}>
      <Projects LimitShow={false} initialType="academic" isUrlBound={true} />
    </div>
  );
}
