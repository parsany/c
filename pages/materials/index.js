import { useState, useEffect } from "react";
import styles from "@/styles/Teaching.module.css";
import Image from "next/image";
import Materials from '@/public/content/materials/MaterialsPage.json';
import Link from "next/link";

export default function Teaching() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);

  const filteredCourses = Materials.filter(
    (course) =>
      course.show === 1 && 
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const handleCourseClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Materials</h1>

      <input
        type="text"
        placeholder="Search for course name or desc..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.cardContainer}>
        {filteredCourses.slice(0, visibleCount).map((course) => (
          <div key={course.id} className={styles.card}>
            <Link href={"materials/" + course.link} onClick={handleCourseClick}>
              <Image
                src={course.image}
                alt={course.title}
                className={styles.image}
                width={300}
                height={200}
              />
              <h2 className={styles.courseTitle}>{course.title}</h2>
              <p className={styles.description}>{course.description}</p>
              <p className={styles.date}>{course.date}</p>
            </Link>
          </div>
        ))}
      </div>

      {filteredCourses.length > visibleCount && (
        <button className={styles.showMoreButton} onClick={handleShowMore}>
          Show More
        </button>
      )}

      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}