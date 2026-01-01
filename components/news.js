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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          I was born in a beautiful city in Europe in 1993. In 2012, I finished my high school education and received a
          Matura diploma. Then, in early 2019, I received my Bachelor&apos;s degree in Computer Science. I am currently self-employed
          as the head of a small collective.
        </p>
        
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. 
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
