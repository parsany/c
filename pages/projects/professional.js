import styles from '@/styles/PageStyle.module.css';
import Projects from '../../components/projects';

export default function ProfessionalProjectsPage() {
  return (
    <div className={styles.container}>
      <Projects LimitShow={false} initialType="professional" isUrlBound={true} />
    </div>
  );
}
