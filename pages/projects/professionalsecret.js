import styles from '@/styles/PageStyle.module.css';
import Projects from '../../components/projects';

export default function ProfessionalSecretProjectsPage() {
  return (
    <div className={styles.container}>
      <Projects LimitShow={false} initialType="professional" isUrlBound={true} ignoreActiveFilter={true} />
    </div>
  );
}
