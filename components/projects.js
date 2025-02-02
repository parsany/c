import { useState, useMemo } from "react";
import styles from "@/styles/Projects.module.css";
import Image from "next/image";
import { ProjectStuff } from "@/public/JSONJS";

export default function Projects({ LimitShow }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [playedVideos, setPlayedVideos] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = useMemo(() => {
    const tags = new Set(ProjectStuff.map(project => project.tag));
    return ['All', ...Array.from(tags).sort()]; // Sort tags alphabetically
  }, []);

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

  const renderMedia = ({ id, video, image, name }) => {
    const isPlaying = (hoveredId?.id === id || playedVideos[id]) && video;
    return isPlaying ? (
      <video
        src={video}
        autoPlay
        muted
        loop
        className={styles.video}
        onEnded={() =>
          !hoveredId?.id === id &&
          setPlayedVideos((prev) => ({ ...prev, [id]: false }))
        }
      />
    ) : (
      <Image
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
        className={styles.image}
      />
    );
  };

  const getCardClass = (project, index) => {
    if (LimitShow !== true) return styles.card;

    const isHovered = hoveredId?.id === project.id;
    const directionClass = hoveredId
      ? hoveredId.index < index
        ? styles.moveRight
        : styles.moveLeft
      : "";

    const positionClass = isHovered
      ? project.id === 1
        ? styles.selectedLeft
        : project.id === 2
          ? styles.selected
          : project.id === 3
            ? styles.selectedRight
            : ""
      : "";

    return [styles.card, positionClass, directionClass]
      .filter(Boolean)
      .join(" ");
  };

  const filteredProjects = selectedCategory && selectedCategory !== 'All' 
    ? ProjectStuff.filter(project => project.tag === selectedCategory)
    : ProjectStuff;

    const displayedProjects =
    LimitShow === true
      ? ProjectStuff.filter((project) => [1, 2, 3].includes(project.id))
          .sort((a, b) => a.id - b.id)
      : filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(
          0,
          LimitShow || undefined
        );

        return (
          <div className={styles.elements}>
            <h1 className={styles.title}>Selected Projects</h1>
            <p className={styles.subtitle}>
              I like to learn by making things. Here&apos;s some projects I&apos;ve
              worked on.
            </p>
            
            {!LimitShow && (
              <div className={styles.filterContainer}>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                    className={`${styles.filterButton} ${
                      (selectedCategory === category || (!selectedCategory && category === 'All')) ? 
                      styles.active : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
      
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
