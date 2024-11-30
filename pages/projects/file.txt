import styles from '@/styles/Projects.module.css';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      id: 1,
      name: 'Pandas',
      description:
        'Flexible and powerful data analysis / manipulation library for Python, providing labeled data structures.',
      date: 'Oct 26, 2023',
      image: '/pandas.png', // Replace with actual image path
      link: '#',
    },
    {
      id: 2,
      name: 'PyTorch',
      description:
        'PyTorch is a Python package that provides tensor computation (like NumPy) with strong GPU acceleration.',
      date: 'Oct 26, 2023',
      image: '/pytorch.png', // Replace with actual image path
      link: '#',
    },
    {
      id: 3,
      name: 'scikit-learn',
      description:
        'scikit-learn is a Python module for machine learning built on top of SciPy and is distributed under the 3-Clause BSD license.',
      date: 'Oct 26, 2023',
      image: '/scikit-learn.png', // Replace with actual image path
      link: '#',
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Selected Projects</h1>
      <p className={styles.subtitle}>
        I enjoy making things. Here are a selection of projects that I have worked on over the years.
      </p>
      <div className={styles.grid}>
        {projects.map((project) => (
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
  );
}
