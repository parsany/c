import styles from '@/styles/PageStyle.module.css';
import Projects from '../../components/projects';
export default function ProjectsPage() {

  return (
    <div className={styles.container}>
      <Projects NumberShown={0}/>
    </div>
  );
}
