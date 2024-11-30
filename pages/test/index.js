import styles from '@/styles/Profile.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.Main}>
    <div className={styles.container}>
      {/* Profile Section */}
      <div className={styles.profile}>
        <Image
        src="/c/vercel.svg"
        alt="Vercel Logo"
        className={styles.profileImage}
        width={100}
        height={24}
        priority
      />
        <div className={styles.name}>
          <h1>Parsa Niavand</h1>
          <h2>Computer Science Student</h2>
          {/* <h3>-</h3> */}
          <div className={styles.links}>
            {/* Replace # with actual links */}
            <a href="#" aria-label="Email">📧</a>
            <a href="#" aria-label="X (Twitter)">❌</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="GitHub">🐙</a>
            <a href="#" aria-label="LinkedIn">🔗</a>
            <a href="#" aria-label="Google Scholar">📚</a>
            <a href="#" aria-label="ORCID">🆔</a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className={styles.about}>
        <h2>Bio</h2>
        <p>
        Parsa Niavand is a computer science student currently studying at the University of SRBIAU. He has a passion for intelligent systems, modeling and computation, and robotics. In addition to his academic pursuits, he enjoys exploring game and web development, combining creativity with technical skill.
        </p>
        <button className={styles.downloadCV}>
        <a href="/c/CV.pdf" download="cv">Download CV</a>
        </button>
      </div>

      {/* Interests and Education */}
      <div className={styles.details}>
        <div className={styles.section}>
          <h3>Interests</h3>
          <ul>
            <li>Artificial Intelligence</li>
            <li>Robotics</li>
            <li>Simulation and Graphics</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Education</h3>
          <ul>
            <li>BSc Computer Science - SRBIAU</li>
            {/* <li>MEng Artificial Intelligence - MIT</li>
            <li>BSc Artificial Intelligence - MIT</li> */}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
