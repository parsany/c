import styles from "@/styles/Profile.module.css";
import Image from "next/image";
import Link from "next/link";

export default function MainCard() {
  return (
    <div>
      <div className={styles.main}>
        {/* Profile Section */}
        <div className={styles.profile}>
          <Image
            src="/c/content/main.jpg"
            alt="Image"
            className={styles.profileImage}
            width={100}
            height={24}
            priority
          />
          <div className={styles.name}>
            <div className={styles.tuple_construct}>
              <h1>Parsa Niavand</h1>
              <h3>he/him, they/them</h3>
            </div>

            <h2>Computer Science Student</h2>
            <div className={styles.links}>
              <a href="https://twitter.com/payrimSp" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <Image
            src="/c/icons/twitter.svg"
            alt="Twitter"
            className={styles.logo}
            width={30}
            height={30}
            priority
          />
              </a> 
              <a href="https://www.instagram.com/velvetphy" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Image
            src="/c/icons/instagram.svg"
            alt="Instagram"
            className={styles.logoS}
            width={30}
            height={30}
            priority
          />
              </a> 
              <a
                href="https://github.com/parsany"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/c/icons/github-mark.svg"
                  alt="GitHub"
                  className={styles.logoI}
                  width={30}
                  height={30}
                  priority
                />
              </a>
              {/* <a href="#" aria-label="LinkedIn">
                🔗
              </a>
              <a href="#" aria-label="Google Scholar">
                📚
              </a>
              <a href="#" aria-label="ORCID">
                🆔
              </a> */}
            </div>
          </div>
        </div>

        {/* About */}
        <div className={styles.about}>
          <h2>Bio</h2>
          <p>
            Parsa Niavand is a computer science student currently studying at
            the University of SRBIAU. He has a passion for intelligent systems,
            modeling and computation, and robotics. In addition to his academic
            pursuits, he enjoys exploring game and web development, combining
            creativity with technical skill.
          </p>
          <button className={styles.downloadCV}>
            <a href="/c/CV.pdf" download="cv">
              Download CV
            </a>
          </button>
        </div>

        {/* Interests */}
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
