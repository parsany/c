import styles from "@/styles/Experience.module.css";
import Image from "next/image";

export default function Experience({IsIsolated}) {
  return (
    <div>
      <h1 className={styles.title}>Experience</h1>
      <div className={IsIsolated ? styles.box : styles.boxnormal}>
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/c/icons/cloud.svg"
              alt="Cloud Icon"
              className={styles.icon}
              width={30}
              height={30}
            />
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>Junior Frontend Web Developer</h2>
              <p className={styles.company}>Pixie Studio</p>
              <p className={styles.dates}>November 2023 - October 2024</p>
            </div>
          </div>
          <p className={styles.responsibilitiesTitle}>
            Responsibilities include:
          </p>
          <ul className={styles.responsibilities}>
            <li className={styles.responsibilitiesItem}>
              Developed responsive web applications using Next.js and React.
            </li>
            <li className={styles.responsibilitiesItem}>
              Utilized Tailwind CSS for efficient styling and layout design.
            </li>
            <li className={styles.responsibilitiesItem}>
              Implemented server-side components to enhance performance and SEO.
            </li>
            <li className={styles.responsibilitiesItem}>
              Participated in code reviews and contributed to team knowledge
              sharing.
            </li>
          </ul>
        </div>

        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/c/icons/software.svg"
              alt="Software Icon"
              className={styles.icon}
              width={30}
              height={30}
            />
            <div className={styles.jobInfo}>
              <h2 className={styles.jobTitle}>UI Designer</h2>
              <p className={styles.company}>Karo Game Studio</p>
              <p className={styles.dates}>December 2021 - August 2022</p>
            </div>
          </div>
          <p className={styles.responsibilitiesTitle}>
            Responsibilities include:
          </p>
          <ul className={styles.responsibilities}>
            <li className={styles.responsibilitiesItem}>
              Designed user interfaces for game menus and HUDs.
            </li>
            <li className={styles.responsibilitiesItem}>
              Collaborated with game developers and artists to create cohesive
              visual styles.
            </li>
            <li className={styles.responsibilitiesItem}>
              Created prototypes using Figma to visualize design concepts.
            </li>
          </ul>
        </div>
      </div>

      <h1 className={styles.title}>Education</h1>

      <div className={IsIsolated ? styles.box : styles.boxnormal}>
        <div className={styles.job}>
          <div className={styles.jobHeader}>
            <Image
              src="/c/icons/education.svg"
              alt="Education Icon"
              className={styles.icon}
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
    </div>
  );
}
