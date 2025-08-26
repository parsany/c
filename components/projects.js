import { useState, useMemo } from "react";
import styles from "@/styles/Projects.module.css";
import Image from "next/image";
import { ProjectStuff } from "@/public/JSONJS";
import { useRouter } from 'next/router';

export default function Projects({ LimitShow }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [playedVideos, setPlayedVideos] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [videoStates, setVideoStates] = useState({});
  const router = useRouter();

  const filteredProjects = useMemo(() => {
    let projects = selectedCategory && selectedCategory !== "All"
      ? ProjectStuff.filter((project) => project.tag.includes(selectedCategory))
      : ProjectStuff;


    if (searchTerm.trim()) {
      projects = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return projects.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCategory, searchTerm]);


  const categories = useMemo(() => {
    const allTags = ProjectStuff.flatMap((project) => project.tag);
    const uniqueTags = new Set(allTags);
    return ["All", ...Array.from(uniqueTags).sort()];
}, []);

  const handleMouseEnter = (id, index) => {
    setHoveredId({ id, index });
    setPlayedVideos((prev) => ({ ...prev, [id]: true }));
    setVideoStates((prev) => ({ ...prev, [id]: { loopStarted: false, loopCompleted: false } }));
  };

  const handleMouseLeave = (id) => {
    setHoveredId(null);
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

  const renderMedia = ({ id, video, image, name }) => {
    const shouldPlayVideo = (hoveredId?.id === id || (playedVideos[id] && !videoStates[id]?.loopCompleted)) && video;
    
    return shouldPlayVideo ? (
      <video
        src={video}
        autoPlay
        muted
        loop
        className={styles.video}
        onTimeUpdate={(e) => {
          if (e.target.currentTime < 0.1 && videoStates[id]?.loopStarted && !hoveredId) {
            setVideoStates((prev) => ({
              ...prev,
              [id]: { ...prev[id], loopCompleted: true }
            }));
            setPlayedVideos((prev) => ({ ...prev, [id]: false }));
          } else if (e.target.currentTime > 0.1 && !videoStates[id]?.loopStarted) {
            setVideoStates((prev) => ({
              ...prev,
              [id]: { ...prev[id], loopStarted: true }
            }));
          }
        }}
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
  
  const displayedProjects =
  LimitShow === true
    ? filteredProjects.filter((project) => [1, 2, 3].includes(project.id)).sort((a, b) => a.id - b.id)
    : filteredProjects.slice(0, LimitShow || undefined);


  return (
    <div className={styles.elements}>
      <h1 className={styles.title}>Selected Projects</h1>
      <p className={styles.subtitle}>
        I like to learn by making things. Here&apos;s some projects I&apos;ve worked on.
      </p>

      {!LimitShow &&
      <input
        type="text"
        placeholder="Search for project name or desc..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
}

      {!LimitShow && (
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === "All" ? null : category)}
              className={`${styles.filterButton} ${selectedCategory === category || (!selectedCategory && category === "All")
                  ? styles.active
                  : ""
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
                <p className={styles.projectDescription}>{project.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {LimitShow && (
        <div className={styles.buttonContainer}>
        <button
          className={styles.morePostsButton}
          onClick={() => router.push('/projects')}
        >
          More Projects
        </button>
        </div>
      )}
    </div>
  );
}