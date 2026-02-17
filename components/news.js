import React, { useState } from 'react';
import styles from '@/styles/News.module.css';
import logData from '@/public/content/materials/log.json';
import { Calendar, User, Briefcase, Code, GraduationCap, FileText, Globe, Monitor, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';
import Contact from './contact';

const ICON_MAP = {
  'job.svg': Briefcase,
  'code.svg': Code,
  'edu.svg': GraduationCap,
  'education.svg': GraduationCap,
  'globe.svg': Globe,
  'window.svg': Monitor,
  'experience.svg': Cpu,
  'file.svg': FileText,
  'software.svg': Cpu,
  'default': FileText
};

export default function News() {
  const [mode, setMode] = useState('personal');
  const events = logData[mode] || [];

  const getIcon = (iconName) => {
    const IconComponent = ICON_MAP[iconName] || ICON_MAP['default'];
    return <IconComponent className={styles.eventIcon} size={20} />;
  };

  const sortedEvents = [...events].sort((a, b) => {
    const [yearA, monthA = 0] = String(a.date).split('.').map(p => parseInt(p) || 0);
    const [yearB, monthB = 0] = String(b.date).split('.').map(p => parseInt(p) || 0);
    
    if (yearA !== yearB) return yearB - yearA;
    return monthB - monthA;
  });

  return (
    <div className={styles.container}>
      <section className={styles.aboutSection}>
        <div className={styles.header}>
          <User className={styles.headerIcon} size={32} />
          <h1 className={styles.title}>About Me</h1>
        </div>
        <div className={styles.bio}>
          <p>
            I am a final-year Computer Science student at the University of SRBIAU, driven by a deep fascination with how intelligent systems and computational modeling can reshape our world. My academic focus lies at the intersection of robotics and complex problem-solving, where I strive to turn theoretical research into innovative, real-world technical solutions.
          </p>
          <p>
            Beyond the lab, I bridge the gap between technical rigor and creative expression through web and game development. Whether I’m architecting a system or building an immersive digital environment, I am dedicated to advancing the boundaries of what’s possible through code.
          </p>
        </div>
      </section>

      <Contact/>
      

      <section className={styles.logSection}>
        <div className={styles.header}>
          <Calendar className={styles.headerIcon} size={32} />
          <h2 className={styles.title}>Timeline Log</h2>
        </div>
        
        <div className={styles.switchContainer}>
          <button 
            className={`${styles.switchBtn} ${mode === 'personal' ? styles.active : ''}`}
            onClick={() => setMode('personal')}
          >
            Personal Mode
          </button>
           <button 
            className={`${styles.switchBtn} ${mode === 'fallout' ? styles.active : ''}`}
            onClick={() => setMode('fallout')}
          >
            Fallout Mode
          </button>
        </div>
        
        <div className={styles.timeline}>
          {sortedEvents.map((event, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.dateColumn}>
                <span className={styles.date}>{event.date}</span>
              </div>
              
              <div className={styles.markerColumn}>
                <div className={styles.markerLine}></div>
                <div className={styles.markerNode}></div>
              </div>

              <div className={styles.contentColumn}>
                <div className={styles.card}>
                  <div className={styles.iconWrapper}>
                    {getIcon(event.icon)}
                  </div>
                  <p className={styles.description} dangerouslySetInnerHTML={{ __html: event.description }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
