import React from 'react';
import Image from 'next/image';
import styles from '@/styles/News.module.css';
import events from '@/public/content/materials/log.json'; 

export default function News(){
  return (
    <div className={styles.news}>
      <div className={styles.bio}>
        <h1>About Me</h1>
        <p>
         I am a final-year Computer Science student at the University of SRBIAU, driven by a deep fascination with how intelligent systems and computational modeling can reshape our world. My academic focus lies at the intersection of robotics and complex problem-solving, where I strive to turn theoretical research into innovative, real-world technical solutions.
          </p>
          <p>
        Beyond the lab, I bridge the gap between technical rigor and creative expression through web and game development. Whether I’m architecting a system or building an immersive digital environment, I am dedicated to advancing the boundaries of what’s possible through code.
        </p>
      </div>

      <div className={styles.eventLog}>
        <h2>Event Log</h2>
        {events.map((event, index) => (
          <div key={index} className={styles.eventItem}>
            <div className={styles.iconContainer}>
              <Image
                src={`/icons/${event.icon}`} 
                alt={"icon"}
                width={24}
                height={24}
                className={styles.icon}
              />
            </div>
            <span className={styles.eventDate}>{event.date}</span>
            <span className={styles.eventDescription}>{event.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
