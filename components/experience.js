import styles from "@/styles/Experience.module.css";
import { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

export default function Experience({ IsIsolated }) {

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.sectionTitle}>Experience</h1>

      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}></div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Award className={styles.icon} size={24} />
              </div>
              <div className={styles.headerText}>
                <div className={styles.headerMain}>
                  <h2 className={styles.role}>Fullstack Web Developer</h2>
                  <span className={styles.duration}>Jan 2024 - Present</span>
                </div>
                <div className={styles.meta}>
                  <span className={styles.company}>Codeafzar Codesheen</span>
                </div>
              </div>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.achievementsLabel}>Key Achievements:</p>
              <ul className={styles.achievementsList}>
                <li>Built a real-time social web and mobile application from scratch using NestJS, Socket.io, Redis, and Capacitor.js.</li>
                <li>Co-developed a GPS fleet tracking system using Next.js and tRPC, implementing endpoints for high-frequency IoT telemetry.</li>
                <li>Engineered dual-language e-commerce portals and warranty verification systems using NestJS, PostgreSQL, and Turborepo.</li>
                <li>Developed interactive client interfaces and landing pages for B2B gold trading and intercity ride-sharing platforms.</li>
                <li>Managed technical planning, requirement gathering, and delivery for both collaborative team projects and solo launches.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}></div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Award className={styles.icon} size={24} />
              </div>
              <div className={styles.headerText}>
                <div className={styles.headerMain}>
                  <h2 className={styles.role}>Frontend Freelance Developer</h2>
                  <span className={styles.duration}>Jan 2023 - Nov 2023</span>
                </div>
                <div className={styles.meta}>
                  <span className={styles.company}>Independent Contract</span>
                </div>
              </div>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.achievementsLabel}>Key Achievements:</p>
              <ul className={styles.achievementsList}>
                <li>Built and shipped responsive, client-facing website frontends using Next.js, React, and CSS.</li>
                <li>Handled on-page technical SEO, set up metadata structures, and optimized page loading speeds for local business landing pages.</li>
                <li>Converted design mockups and Figma frames into clean, interactive, and modular UI components.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Job 4 */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}></div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Award className={styles.icon} size={24} />
              </div>
              <div className={styles.headerText}>
                <div className={styles.headerMain}>
                  <h2 className={styles.role}>UI/UX Designer</h2>
                  <span className={styles.duration}>Nov 2021 - Oct 2022</span>
                </div>
              </div>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.achievementsLabel}>Key Achievements:</p>
              <ul className={styles.achievementsList}>
                <li>Designed and prototyped user interfaces and UX in Figma.</li>
                <li>Created wireframes, complex user flows, and interactive prototypes.</li>
                <li>Specialized in dashboard UI design and cohesive visual styles.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h1 className={styles.sectionTitle}>Education</h1>

      <div className={styles.timeline}>
        {/* Education 1 */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}></div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <GraduationCap className={styles.icon} size={24} />
              </div>
              <div className={styles.headerText}>
                <div className={styles.headerMain}>
                  <h2 className={styles.role}>BSc Computer Science</h2>
                  <span className={styles.duration}>Sep 2019 - June 2026</span>
                </div>
                <div className={styles.meta}>
                  <span className={styles.company}>SRBIAU University</span>
                </div>
              </div>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.gpa}>GPA: 3.4</p>
              <p className={styles.achievementsLabel} style={{ marginTop: '16px' }}>Relevant Coursework:</p>
              <ul className={styles.achievementsList}>
                <li>Artificial Intelligence (3.2/4)</li>
                <li>Probability I (3.1/4)</li>
                <li>Combinatorics (3.4/4)</li>
                <li>Theory of Computation (3.7/4)</li>
                <li>Linear Optimization (3.1/4)</li>
                <li>Design & Analysis of Algorithms (3.8)</li>
                <li>Linear Algebra (3.2)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
