import { useState } from "react";
import styles from "@/styles/Projects.module.css";
import Image from "next/image";
import { ProjectStuff } from "@/public/JSONJS";

export default function Projects({ NumberShown }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [playedVideos, setPlayedVideos] = useState({});

  const handleMouseEnter = (id, index) => {
    setHoveredId({ id, index });
    setPlayedVideos((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setTimeout(() => {
      setHoveredId(null);
      setPlayedVideos((prev) => ({ ...prev, [id]: false }));
    }, 200);
  };

  const renderMedia = (project) => {
    const isVideoPlaying = (hoveredId?.id === project.id || playedVideos[project.id]) && project.video;
    return isVideoPlaying ? (
      <video
        src={project.video}
        autoPlay
        muted
        loop
        className={styles.video}
        onEnded={() => {
          if (hoveredId?.id !== project.id) {
            setPlayedVideos((prev) => ({ ...prev, [project.id]: false }));
          }
        }}
      />
    ) : (
      <Image
        src={project.image}
        alt={project.name}
        layout="fill"
        objectFit="cover"
        className={styles.image}
      />
    );
  };

  const getCardClass = (project, index) => {
    if (NumberShown !== 3) return styles.card;

    const isHovered = hoveredId?.id === project.id;
    const directionClass = hoveredId ? (hoveredId.index < index ? styles.moveRight : styles.moveLeft) : "";

    let positionClass = "";
    if (isHovered) {
      positionClass =
        project.id === 1 ? styles.selectedLeft :
        project.id === 2 ? styles.selected :
        project.id === 3 ? styles.selectedRight : "";
    }

    return `${styles.card} ${positionClass} ${directionClass}`.trim();
  };

  const sortedProjects = ProjectStuff.sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayedProjects = NumberShown === 0 ? sortedProjects : sortedProjects.slice(0, NumberShown);

  return (
    <div className={styles.elements}>
      <h1 className={styles.title}>Selected Projects</h1>
      <p className={styles.subtitle}>
        I like to learn by making things. Here&apos;s some projects I&apos;ve worked on.
      </p>
      <div className={styles.grid}>
        {displayedProjects.map((project, index) => (
          <div
            key={project.id}
            className={getCardClass(project, index)}
            onMouseEnter={() => handleMouseEnter(project.id, index)}
            onMouseLeave={() => handleMouseLeave(project.id)}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Link to ${project.name}`}
            >
              <div className={styles.banner}>{renderMedia(project)}</div>
              <div className={styles.content}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}