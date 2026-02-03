import styles from "@/styles/Experience.module.css";
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function Experience({IsIsolated}) {

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme);
  }, []);
  
  return (
    <div>
      <h1 className={styles.title}>Experience (this part is updated)</h1>
      <div className={IsIsolated ? styles.box : styles.boxnormal}>
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/icons/experience.svg"
              alt="Experience Icon"
              className={theme === 'dark' ? styles.icon : styles.icond}
              width={30}
              height={30}
            />
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>Lead Full-Stack Developer</h2>
              <p className={styles.company}>Independent Team</p>
              <p className={styles.dates}>July 2025 - Present (6 months)</p>
            </div>
          </div>
          <p className={styles.responsibilitiesTitle}>
            Key achievements & responsibilities:
          </p>
          <ul className={styles.responsibilities}>
            <li className={styles.responsibilitiesItem}>
              Simultaneously managed 7+ projects, prioritizing features and ensuring on-time delivery.
            </li>
            <li className={styles.responsibilitiesItem}>
              Spearheaded project roadmaps and technical decision-making for a cross-functional team.
            </li>
          </ul>
        </div>

        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/icons/experience.svg"
              alt="Experience Icon"
              className={theme === 'dark' ? styles.icon : styles.icond}
              width={30}
              height={30}
            />
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>Back-end Developer</h2>
              <p className={styles.company}>Independent Team</p>
              <p className={styles.dates}>October 2024 - July 2025 (10 months)</p>
            </div>
          </div>
          <p className={styles.responsibilitiesTitle}>
            Key achievements & responsibilities:
          </p>
          <ul className={styles.responsibilities}>
            <li className={styles.responsibilitiesItem}>
              Designed and implemented scalable, testable, and maintainable back-end architectures.
            </li>
            <li className={styles.responsibilitiesItem}>
              Developed secure authentication and access management systems.
            </li>
          </ul>
        </div>

        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/icons/experience.svg"
              alt="Experience Icon"
              className={theme === 'dark' ? styles.icon : styles.icond}
              width={30}
              height={30}
            />
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>Front-end Developer</h2>
              <p className={styles.company}>Independent Team</p>
              <p className={styles.dates}>January 2024 - October 2024 (9 months)</p>
            </div>
          </div>
          <p className={styles.responsibilitiesTitle}>
            Key achievements & responsibilities:
          </p>
          <ul className={styles.responsibilities}>
            <li className={styles.responsibilitiesItem}>
              Developed secure, reusable components using React, Next.js, and TypeScript.
            </li>
            <li className={styles.responsibilitiesItem}>
              Implemented complex UI animations and optimized rendering performance for fast loading.
            </li>
            <li className={styles.responsibilitiesItem}>
              Applied optimized and scalable styling using Tailwind CSS.
            </li>
          </ul>
        </div>

        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/icons/experience.svg"
              alt="Experience Icon"
              className={theme === 'dark' ? styles.icon : styles.icond}
              width={30}
              height={30}
            />
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>UI/UX Designer</h2>
              <p className={styles.company}>Saro Studio</p>
              <p className={styles.dates}>November 2021 - October 2022 (10 months)</p>
            </div>
          </div>
          <p className={styles.responsibilitiesTitle}>
            Key achievements & responsibilities:
          </p>
          <ul className={styles.responsibilities}>
            <li className={styles.responsibilitiesItem}>
              Designed and prototyped user interfaces and UX in Figma.
            </li>
            <li className={styles.responsibilitiesItem}>
              Created wireframes, complex user flows, and interactive prototypes.
            </li>
            <li className={styles.responsibilitiesItem}>
              Specialized in dashboard UI design and cohesive visual styles.
            </li>
          </ul>
        </div>
      </div>

      <h1 className={styles.title}>Education</h1>

      <div className={IsIsolated ? styles.box : styles.boxnormal}>
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/icons/education.svg"
              alt="Education Icon"
              className={theme === 'dark' ? styles.icon : styles.icond}
              width={30}
              height={30}
            />
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>BSc Computer Science</h2>
              <p className={styles.company}>SRBIAU University</p>
              <p className={styles.dates}>September 2019 - August 2025</p>
            </div>
          </div>
          <p className={styles.responsibilitiesTitle}>GPA: 3.4</p>
        </div>
      </div>

      {/* <h1 className={styles.title}>Awards</h1>
      <div className={IsIsolated ? styles.box : styles.boxnormal}>
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/icons/cup.svg"
              alt="Awards Icon"
                            className={theme === 'dark' ? styles.icon : styles.icond}
              width={30}
              height={30}
            />
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>
                1st Place in the 2022 
              </h2>
              <p className={styles.company}>AI for Oceans</p>
              <p className={styles.dates}>November 2022</p>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
}
