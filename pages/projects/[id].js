import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";
import { ProjectProfessional } from "@/public/JSONJS";
import styles from "@/styles/ProjectDetail.module.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, X, Globe } from "lucide-react";

export default function ProjectDetail({ project }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  // Lightbox Zoom and Drag States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialTouchDist, setInitialTouchDist] = useState(0);
  const [initialScale, setInitialScale] = useState(1);

  const overlayRef = useRef(null);
  const swipeStartX = useRef(0);

  const redirectTarget = project?.redirect
    ? ProjectProfessional.find((p) => p.slug === project.redirect)
    : null;

  useEffect(() => {
    const element = overlayRef.current;
    if (!element) return;

    const handleWheelZoom = (e) => {
      e.preventDefault();
      const zoomFactor = 0.15;
      setScale((prevScale) => {
        const newScale = e.deltaY < 0 ? prevScale + zoomFactor : prevScale - zoomFactor;
        const clampedScale = Math.max(1, Math.min(newScale, 5));
        if (clampedScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return clampedScale;
      });
    };

    element.addEventListener("wheel", handleWheelZoom, { passive: false });
    return () => {
      element.removeEventListener("wheel", handleWheelZoom);
    };
  }, [isLightboxOpen]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handlePrev = useCallback(() => {
    resetZoom();
    if (project?.project_image) {
      setActiveIndex((prev) =>
        prev === 0 ? project.project_image.length - 1 : prev - 1
      );
    }
  }, [project?.project_image, resetZoom]);

  const handleNext = useCallback(() => {
    resetZoom();
    if (project?.project_image) {
      setActiveIndex((prev) =>
        prev === project.project_image.length - 1 ? 0 : prev + 1
      );
    }
  }, [project?.project_image, resetZoom]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  // Dragging / Panning & Swiping handlers
  const handleMouseDown = (e) => {
    swipeStartX.current = e.clientX;
    setIsDragging(true);
    if (scale > 1) {
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (scale <= 1 && swipeStartX.current) {
      const diffX = e.clientX - swipeStartX.current;
      if (Math.abs(diffX) > 60) {
        if (diffX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    swipeStartX.current = 0;
  };

  // Touch handlers for mobile pinching, panning & swiping
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      swipeStartX.current = e.touches[0].clientX;
      setIsDragging(true);
      if (scale > 1) {
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        });
      }
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialTouchDist(dist);
      setInitialScale(scale);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      if (scale > 1) {
        setPosition({
          x: e.touches[0].clientX - dragStart.x,
          y: e.touches[0].clientY - dragStart.y,
        });
      }
    } else if (e.touches.length === 2 && initialTouchDist > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / initialTouchDist;
      const newScale = Math.max(1, Math.min(initialScale * factor, 5));
      setScale(newScale);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      setInitialTouchDist(0);
    }
    if (e.touches.length === 0) {
      if (isDragging && scale <= 1 && swipeStartX.current && e.changedTouches && e.changedTouches[0]) {
        const diffX = e.changedTouches[0].clientX - swipeStartX.current;
        if (Math.abs(diffX) > 60) {
          if (diffX < 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }
      setIsDragging(false);
      swipeStartX.current = 0;
    }
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Handle keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!project?.project_image || project.project_image.length <= 1) return;

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        if (isLightboxOpen) {
          closeLightbox();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, project?.project_image, handlePrev, handleNext, closeLightbox]);

  const handleContainerClick = useCallback((e) => {
    if (e.target.tagName !== "IMG") {
      closeLightbox();
    }
  }, [closeLightbox]);

  if (!project) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{project.name} | Parsa Ny</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className={styles.inner}>
        <Link href="/projects/professional" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to projects
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{project.name}</h1>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <Calendar size={14} /> {formatDate(project.date)}
            </span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLinkButton}
              >
                <Globe size={14} /> Visit Website
              </a>
            )}
          </div>

          {project.tag && project.tag.length > 0 && (
            <div className={styles.tags}>
              {project.tag.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.divider} />

        {project.project_image && project.project_image.length > 0 && (
          <div className={styles.carouselContainer}>
            {project.project_image.map((imgUrl, index) => (
              <div
                key={imgUrl}
                className={`${styles.carouselSlide} ${index === activeIndex ? styles.carouselSlideActive : ""
                  }`}
                onClick={() => setIsLightboxOpen(true)}
                style={{ cursor: "zoom-in" }}
              >
                <Image
                  src={imgUrl}
                  alt={`${project.name} slide ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={index === 0}
                  className={styles.carouselImage}
                />
              </div>
            ))}

            {project.project_image.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className={`${styles.arrowButton} ${styles.arrowLeft}`}
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className={`${styles.arrowButton} ${styles.arrowRight}`}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={24} />
                </button>

                <div className={styles.indicators}>
                  {project.project_image.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <article className={styles.body}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            remarkPlugins={[remarkGfm]}
          >
            {project.text}
          </ReactMarkdown>
        </article>

        {redirectTarget && (
          <div className={styles.connectedProject}>
            <p>
              This project is connected to <strong>{redirectTarget.name}</strong>.
            </p>
            <Link href={`/projects/${redirectTarget.slug}`} className={styles.connectedLink}>
              View Connected Project: {redirectTarget.name} &rarr;
            </Link>
          </div>
        )}

        <div className={styles.divider} />

        <footer className={styles.footer}>
          <Link href="/projects/professional" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to professional projects
          </Link>
        </footer>
      </div>

      {isLightboxOpen && (
        <div
          ref={overlayRef}
          className={styles.lightboxOverlay}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close Lightbox">
            <X size={28} />
          </button>

          {project.project_image && project.project_image.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
                aria-label="Next Slide"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}

          <div
            className={styles.lightboxImageContainer}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onDoubleClick={closeLightbox}
            onClick={handleContainerClick}
            style={{
              cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-out",
            }}
          >
            <div
              className={styles.lightboxTransformWrapper}
              onClick={(e) => e.stopPropagation()}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.15s ease-out",
              }}
            >
              <img
                src={project.project_image[activeIndex]}
                alt={project.name}
                className={styles.lightboxImage}
                draggable={false}
              />
            </div>
          </div>

          {project.project_image && project.project_image.length > 1 && (
            <div className={styles.lightboxIndicators}>
              {project.project_image.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetZoom();
                    setActiveIndex(index);
                  }}
                  className={`${styles.lightboxDot} ${index === activeIndex ? styles.lightboxDotActive : ""
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = ProjectProfessional.map((project) => ({
    params: { id: project.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = ProjectProfessional.find((item) => item.slug === params.id) || null;

  return {
    props: { project },
  };
}
