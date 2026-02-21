import { useState } from "react";
import styles from "@/styles/Profile.module.css";
import Image from "next/image";
import CV from "./CV";

export default function MainCard() {
  const [isCVOpen, setIsCVOpen] = useState(false);

  return (
    <section className={styles.hero} id="about">
      <div className={styles.heroContent}>
        <div className={styles.innerCard}>
          <div className={styles.topSection}>
            <div className={styles.imageWrapper}>
              <Image
                src="/content/main.jpg"
                alt="Parsa Niavand"
                className={styles.profileImage}
                width={160}
                height={160}
                priority
              />
            </div>
            <div className={styles.headerInfo}>
              <div className={styles.nameRow}>
                <h1 className={styles.heroName}>Parsa Niavand</h1>
              </div>
              <h2 className={styles.heroTitle}>Software Engineer &amp; Researcher</h2>
              <div className={styles.socialLinks}>
                <a href="mailto:quantinitycorp@gmail.com" aria-label="Email" className={styles.socialIcon}>
                  <Image src="/icons/mail.svg" alt="Email" width={20} height={20} />
                </a>
                <a href="https://twitter.com/payrimSp" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialIcon}>
                  <Image src="/icons/twitter.svg" alt="Twitter" width={20} height={20} />
                </a>
                <a href="https://www.linkedin.com/parsany" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
                </a>
                <a href="https://github.com/parsany" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialIcon}>
                  <Image src="/icons/github-mark.svg" alt="GitHub" width={20} height={20} />
                </a>
                <a href="https://t.me/parsanid" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className={styles.socialIcon}>
                  <Image src="/icons/telegram.svg" alt="Telegram" width={20} height={20} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.bioSection}>
            <h3 className={styles.sectionTitle}>Bio</h3>
            <p className={styles.heroBio}>
              Parsa Niavand is a computer science student (near graduation) from the University of SRBIAU. He has a passion for intelligent systems, modeling, computation, and robotics. In addition to his academic pursuits, he enjoys exploring web and game development, combining creativity with technical skill.
            </p>
            <button
              onClick={() => setIsCVOpen(true)}
              className={styles.cvButtonHero}
            >
              Download CV
            </button>
          </div>

          <div className={styles.bottomGrid}>
            <div className={styles.gridColumn}>
              <h3 className={styles.sectionTitle}>Interests</h3>
              <ul className={styles.listItems}>
                <li>Artificial Intelligence</li>
                <li>Robotics and Simulation</li>
                <li>Artificial Life</li>
              </ul>
            </div>
            <div className={styles.gridColumn}>
              <h3 className={styles.sectionTitle}>Education</h3>
              <ul className={styles.listItems}>
                <li>BSc Computer Science - SRBIAU</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CV isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </section>
  );
}
