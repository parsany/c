import { useState, useMemo, useEffect } from "react";
import styles from "@/styles/Projects.module.css";
import Image from "next/image";
import { ProjectAcademic, ProjectProfessional } from "@/public/JSONJS";
import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Projects({ LimitShow, initialType = "professional", isUrlBound = false, ignoreActiveFilter = false }) {
  const [projectType, setProjectType] = useState(initialType);
  const [hoveredId, setHoveredId] = useState(null);
  const [playedVideos, setPlayedVideos] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [videoStates, setVideoStates] = useState({});
  const router = useRouter();

  useEffect(() => {
    setProjectType(initialType);
  }, [initialType]);

  const filteredProjects = useMemo(() => {
    const activeProjects =
      projectType === "academic"
        ? ProjectAcademic
        : (ignoreActiveFilter
            ? ProjectProfessional
            : ProjectProfessional.filter((p) => p.isactive !== false));
    let projects =
      selectedCategory && selectedCategory !== "All"
        ? activeProjects.filter((project) =>
            project.tag.includes(selectedCategory)
          )
        : activeProjects;

    if (searchTerm.trim()) {
      projects = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (projectType === "academic") {
      return projects.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      return projects.sort((a, b) => b.id - a.id);
    }
  }, [projectType, selectedCategory, searchTerm, ignoreActiveFilter]);

  const categories = useMemo(() => {
    const activeProjects =
      projectType === "academic"
        ? ProjectAcademic
        : (ignoreActiveFilter
            ? ProjectProfessional
            : ProjectProfessional.filter((p) => p.isactive !== false));
    const allTags = activeProjects.flatMap((project) => project.tag);
    const uniqueTags = new Set(allTags);
    return ["All", ...Array.from(uniqueTags).sort()];
  }, [projectType, ignoreActiveFilter]);

  const handleMouseEnter = (id, index) => {
    setHoveredId({ id, index });
    setPlayedVideos((prev) => ({ ...prev, [id]: true }));
    setVideoStates((prev) => ({
      ...prev,
      [id]: { loopStarted: false, loopCompleted: false },
    }));
  };

  const handleMouseLeave = (id) => {
    setHoveredId(null);
  };

  const getCardClass = (project, index) => {
    if (LimitShow !== true || projectType === "professional") return styles.card;
    const isHovered = hoveredId?.id === project.id;
    const directionClass = hoveredId
      ? hoveredId.index < index
        ? styles.moveRight
        : styles.moveLeft
      : "";
    const positionClass = isHovered
      ? index === 0
        ? styles.selectedLeft
        : index === 1
          ? styles.selected
          : index === 2
            ? styles.selectedRight
            : ""
      : "";
    return [styles.card, positionClass, directionClass]
      .filter(Boolean)
      .join(" ");
  };

  const renderMedia = ({ id, video, image, name }) => {
    const shouldPlayVideo =
      (hoveredId?.id === id ||
        (playedVideos[id] && !videoStates[id]?.loopCompleted)) &&
      video;

    return shouldPlayVideo ? (
      <video
        src={video}
        autoPlay
        muted
        loop
        className={styles.video}
        onTimeUpdate={(e) => {
          const target = e.target;
          if (
            target.currentTime < 0.1 &&
            videoStates[id]?.loopStarted &&
            !hoveredId
          ) {
            setVideoStates((prev) => ({
              ...prev,
              [id]: { ...prev[id], loopCompleted: true },
            }));
            setPlayedVideos((prev) => ({ ...prev, [id]: false }));
          } else if (
            target.currentTime > 0.1 &&
            !videoStates[id]?.loopStarted
          ) {
            setVideoStates((prev) => ({
              ...prev,
              [id]: { ...prev[id], loopStarted: true },
            }));
          }
        }}
      />
    ) : (
      <Image
        src={image}
        alt={name}
        fill
        style={{ objectFit: "cover" }}
        className={styles.image}
      />
    );
  };

  const displayedProjects =
    LimitShow === true
      ? (projectType === "academic"
          ? filteredProjects
              .filter((project) => [1, 2, 3].includes(project.id))
              .sort((a, b) => a.id - b.id)
          : filteredProjects.slice(0, 3))
      : filteredProjects.slice(0, LimitShow || undefined);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className={styles.elements} id="projects">
      <h1 className={styles.title}>Selected Projects</h1>
      <p className={styles.subtitle}>
        I like to learn by making things. Here&apos;s some projects I&apos;ve
        worked on.
      </p>

      <div className={styles.toggleContainer}>
        <div
          className={`${styles.toggleSlider} ${
            projectType === "professional" ? styles.sliderRight : styles.sliderLeft
          }`}
        />
        <button
          type="button"
          className={`${styles.toggleButton} ${
            projectType === "academic" ? styles.toggleActive : ""
          }`}
          onClick={() => {
            if (isUrlBound) {
              router.push("/projects/academic");
            } else {
              setProjectType("academic");
              setSelectedCategory(null);
              setSearchTerm("");
            }
          }}
        >
          Academic
        </button>
        <button
          type="button"
          className={`${styles.toggleButton} ${
            projectType === "professional" ? styles.toggleActive : ""
          }`}
          onClick={() => {
            if (isUrlBound) {
              router.push("/projects/professional");
            } else {
              setProjectType("professional");
              setSelectedCategory(null);
              setSearchTerm("");
            }
          }}
        >
          Professional
        </button>
      </div>

      {!LimitShow && (
        <input
          type="text"
          placeholder="Search for project name or desc..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {!LimitShow && (
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category === "All" ? null : category)
              }
              className={`${styles.filterButton} ${
                selectedCategory === category ||
                (!selectedCategory && category === "All")
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
            className={`${getCardClass(project, index)} ${
              projectType === "professional" && !project.isactive && !project.redirect && !ignoreActiveFilter
                ? styles.cardStaticWrapper
                : ""
            }`}
            onMouseEnter={() => handleMouseEnter(project.id, index)}
            onMouseLeave={() => handleMouseLeave(project.id)}
          >
            {projectType === "academic" ? (
              <a
                href={project.link || project.wlink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to ${project.name}`}
                className={styles.cardLink}
              >
                <div className={styles.banner}>{renderMedia(project)}</div>
                <div className={styles.content}>
                  <div className={styles.tagsRow}>
                    {project.tag.map((t) => (
                      <span key={t} className={styles.tagPill}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={styles.projectDate}>
                      {formatDate(project.date)}
                    </span>
                    <span className={styles.detailsLink}>
                      Details <ArrowRight size={14} className={styles.detailsArrow} />
                    </span>
                  </div>
                </div>
              </a>
            ) : (project.isactive || project.redirect || ignoreActiveFilter) ? (
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Link to ${project.name}`}
                className={styles.cardLink}
              >
                <div className={styles.banner}>{renderMedia(project)}</div>
                <div className={styles.content}>
                  <div className={styles.tagsRow}>
                    {project.tag.map((t) => (
                      <span key={t} className={styles.tagPill}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={styles.projectDate}>
                      {formatDate(project.date)}
                    </span>
                    <span className={styles.detailsLink}>
                      Details <ArrowRight size={14} className={styles.detailsArrow} />
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className={styles.cardStatic}>
                <div className={styles.banner}>{renderMedia(project)}</div>
                <div className={styles.content}>
                  <div className={styles.tagsRow}>
                    {project.tag.map((t) => (
                      <span key={t} className={styles.tagPill}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                  <div className={styles.cardFooter}>
                    <span className={styles.projectDate}>
                      {formatDate(project.date)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {LimitShow && (
        <div className={styles.buttonContainer}>
          <button
            className={styles.morePostsButton}
            onClick={() => router.push(`/projects/${projectType}`)}
          >
            More Projects
          </button>
        </div>
      )}
    </div>
  );
}