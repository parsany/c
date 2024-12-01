import styles from '@/styles/Projects.module.css';
import Image from 'next/image';
import {ProjectStuff} from '@/public/JSONJS';

export default function Projects() {

  return (
    <div className={styles.container}>
      <div className={styles.elements}>
      <h1 className={styles.title}>Selected Projects</h1>
      <p className={styles.subtitle}>
        I like to learn by making things. Here&apos;s some projects I&apos;ve worked on.
      </p>
      <div className={styles.grid}>
        {ProjectStuff
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((project) => (
            <div key={project.id} className={styles.card}>
              <Image
                src={project.image}
                alt={project.name}
                width={120}
                height={120}
                className={styles.image}
              />
            <div className={styles.content}>
              <h3 className={styles.projectName}>
                {project.name}{' '}
                <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Link to ${project.name}`}>
                  ↗
                </a>
              </h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <p className={styles.projectDate}>{project.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
