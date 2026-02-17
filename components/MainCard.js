import styles from "@/styles/Profile.module.css";
import Image from "next/image";

export default function MainCard() {
  return (
    <section className={styles.hero} id="about">
      <div className={styles.heroContent}>
        <div className={styles.imageWrapper}>
          <Image
            src="/content/main.jpg"
            alt="Parsa Niavand"
            className={styles.profileImage}
            width={220}
            height={220}
            priority
          />
        </div>
        <div className={styles.textContent}>
          <h1 className={styles.heroName}>Parsa Niavand</h1>
          <h2 className={styles.heroTitle}>Software Engineer &amp; Researcher</h2>
          <p className={styles.heroBio}>
            Computer Science Graduate at SRBIAU with a passion for robotics,
            modeling, and computation. My work is fueled by a desire to solve complex challenges through research-driven innovation.
          </p>

          {/* 
          KEEP THIS
          Parsa Niavand is a computer science student (near graduation) from the University of SRBIAU. He has a passion for intelligent systems, modeling, computation, and robotics. In addition to his academic pursuits, he enjoys exploring web and game development, combining creativity with technical skill.
*/}
          <div className={styles.socialLinks}>
            <a href="mailto:quantinitycorp@gmail.com" aria-label="Email" className={styles.socialIcon}>
              <Image src="/icons/mail.svg" alt="Email" width={22} height={22} />
            </a>
            <a href="https://twitter.com/payrimSp" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialIcon}>
              <Image src="/icons/twitter.svg" alt="Twitter" width={22} height={22} />
            </a>
            <a href="https://www.linkedin.com/parsany" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <Image src="/icons/linkedin.svg" alt="LinkedIn" width={22} height={22} />
            </a>
            <a href="https://github.com/parsany" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialIcon}>
              <Image src="/icons/github-mark.svg" alt="GitHub" width={22} height={22} />
            </a>
            <a href="https://t.me/parsanid" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className={styles.socialIcon}>
              <Image src="/icons/telegram.svg" alt="Telegram" width={22} height={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
