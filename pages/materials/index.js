import { useState } from "react";
import styles from "@/styles/Teaching.module.css";
import Image from "next/image";
import {Materials} from "@/public/JSONJS";

export default function Teaching() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = Materials.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Teaching</h1>

      <input
        type="text"
        placeholder="Search for a course..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className={styles.cardContainer}>
        {filteredCourses.map(course => (
          <div key={course.id} className={styles.card}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
