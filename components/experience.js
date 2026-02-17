import styles from "@/styles/Experience.module.css";
import { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

export default function Experience({IsIsolated}) {

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme);
  }, []);
  
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.sectionTitle}>Experience</h1>
      
      <div className={styles.timeline}>
        {/* Job 1 */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}></div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Award className={styles.icon} size={24} />
              </div>
              <div className={styles.headerText}>
                <h2 className={styles.role}>Lead Full-Stack Developer</h2>
                <div className={styles.meta}>
                  <span className={styles.company}>Codeafzar Codesheen</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.duration}>July 2025 - Present</span>
                </div>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <p className={styles.achievementsLabel}>Key Achievements:</p>
              <ul className={styles.achievementsList}>
                <li>Simultaneously managed 7+ projects, prioritizing features and ensuring on-time delivery.</li>
                <li>Spearheaded project roadmaps and technical decision-making for a cross-functional team.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Job 2 */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}></div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Award className={styles.icon} size={24} />
              </div>
              <div className={styles.headerText}>
                <h2 className={styles.role}>Back-end Developer</h2>
                <div className={styles.meta}>
                  <span className={styles.company}>Codeafzar Codesheen</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.duration}>Oct 2024 - July 2025</span>
                </div>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <p className={styles.achievementsLabel}>Key Achievements:</p>
              <ul className={styles.achievementsList}>
                <li>Designed and implemented scalable, testable, and maintainable back-end architectures.</li>
                <li>Developed secure authentication and access management systems.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Job 3 */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineMarker}></div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Award className={styles.icon} size={24} />
              </div>
              <div className={styles.headerText}>
                <h2 className={styles.role}>Front-end Developer</h2>
                <div className={styles.meta}>
                  <span className={styles.company}>Codeafzar Codesheen</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.duration}>Jan 2024 - Oct 2024</span>
                </div>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <p className={styles.achievementsLabel}>Key Achievements:</p>
              <ul className={styles.achievementsList}>
                <li>Developed secure, reusable components using React, Next.js, and TypeScript.</li>
                <li>Implemented complex UI animations and optimized rendering performance.</li>
                <li>Applied optimized and scalable styling using Tailwind CSS.</li>
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
                <h2 className={styles.role}>UI/UX Designer</h2>
                <div className={styles.meta}>
                  <span className={styles.company}>Codeafzar Codesheen </span>
                  <span className={styles.separator}>•</span>
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
                <h2 className={styles.role}>BSc Computer Science</h2>
                <div className={styles.meta}>
                  <span className={styles.company}>SRBIAU University</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.duration}>Sep 2019 - June 2026</span>
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
