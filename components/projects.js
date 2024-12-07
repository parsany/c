import { useState } from "react";
import styles from "@/styles/Projects.module.css";
import Image from "next/image";
import { ProjectStuff } from "@/public/JSONJS";

export default function Projects({ NumberShown }) {
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id, index) => {
    setHoveredId({ id, index });
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <div className={styles.elements}>
      <h1 className={styles.title}>Selected Projects</h1>
      <p className={styles.subtitle}>
        I like to learn by making things. Here&apos;s some projects I&apos;ve
        worked on.
      </p>
      <div className={styles.grid}>
        {ProjectStuff.sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, NumberShown === 0 ? undefined : NumberShown)
          .map((project, index) => (
            <div
              key={project.id}
              className={`${styles.card} ${
                NumberShown === 3 && hoveredId?.id === project.id
                  ? project.id === 1
                    ? styles.selectedLeft 
                    : project.id === 2
                    ? styles.selected
                    : project.id === 3
                    ? styles.selectedRight
                    : ""
                  : ""
              } ${
                NumberShown === 3 && hoveredId &&
                (hoveredId.index < index ? styles.moveRight : styles.moveLeft)
              }`}
              onMouseEnter={() => handleMouseEnter(project.id, index)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to ${project.name}`}
              >
                <div className={styles.banner}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    layout="fill"
                    objectFit="cover"
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
