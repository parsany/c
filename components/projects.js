import { useState } from "react";
import styles from "@/styles/Projects.module.css";
import Image from "next/image";
import { ProjectStuff } from "@/public/JSONJS";

export default function Projects({ NumberShown }) {
  const [hoveredId, setHoveredId] = useState(null);

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
          .map((project) => (
            <div
              key={project.id}
              className={`${styles.card} ${
                hoveredId === project.id ? styles.active : styles.inactive
              }`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
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
                  {/* <p className={styles.projectDate}>{project.date}</p> */}
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
