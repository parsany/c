import styles from "@/styles/Profile.module.css";
import Image from "next/image";
import MailBox from "@/components/MailBox";
import React, { useState } from "react";
import { Phone } from "lucide-react";

export default function MainCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.main}>
        {/* Profile Section */}
        <div className={styles.profile}>
          <Image
            src="/content/main.jpg"
            alt="Image"
            className={styles.profileImage}
            width={100}
            height={24}
          />
          <div className={styles.name}>
            <div className={styles.tuple_construct}>
              <h1>Parsa Niavand</h1>
              <h3>he/him</h3>
            </div>

            <h2>Software Engineer</h2>
            {/* Full-Stack Developer & AI Specialist */}
            <div className={styles.links}>
              <a onClick={setIsOpen} style={{ cursor: "pointer" }}>
                <Image
                  src="/icons/mail.svg"
                  alt="mail"
                  className={styles.logo}
                  width={30}
                  height={30}
                />
              </a>
              {isOpen && <MailBox onClose={handleToggle} />}

              <a
                href="https://twitter.com/payrimSp"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className={styles.logo}
                  width={30}
                  height={30}
                />
              </a>
              <a
                href="https://www.linkedin.com/parsany"
                aria-label="linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt="linkedin"
                  className={styles.logo}
                  width={30}
                  height={30}
                />
              </a>
              <a
                href="https://github.com/parsany"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/github-mark.svg"
                  alt="GitHub"
                  className={styles.logo}
                  width={30}
                  height={30}
                />
              </a>
              <a
                href="https://t.me/velvetphy"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/icons/telegram.svg"
                  alt="Telegram"
                  className={styles.logo}
                  width={30}
                  height={30}
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
            Parsa Niavand is a computer science student graduate from the University of SRBIAU. He has a passion for intelligent systems,
            modeling, computation, and robotics. In addition to his academic
            pursuits, he enjoys exploring web and game development, combining
            creativity with technical skill.               contact me for resume and current projects (i don&apos;t add them here)
          </p>
          <div>
            <button className={styles.downloadCV} onClick={openPopup}>
            Download CV (REDACTED)
            </button>

            {showPopup && (
              <div className={styles.overlay} onClick={closePopup}>
                <div
                  className={styles.CV_container}
                  onClick={(e) => e.stopPropagation()} // Prevent closing popup when clicking inside
                >
                  <button className={styles.downloadCV}>
                    <a href="/CV.pdf" download="cv">
                      Academic CV
                    </a>
                  </button>
                  <button className={styles.downloadCV}>
                    <a href="/CVB.pdf" download="cv">
                      Business CV
                    </a>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interests */}
        <div className={styles.details}>
          <div className={styles.section}>
            <h3>Interests</h3>
            <ul>
              <li>Artificial Intelligence</li>
              <li>Robotics and Simulation</li>
              <li>Artificial Life</li>
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
