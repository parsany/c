import styles from '@/styles/Posts.module.css';
import { NewsPost } from '@/public/JSONJS';

export default function RecentNews() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.newsBox}>
        <div className={styles.newsList}>
          {NewsPost.slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item, index) => (
              <div key={index} className={styles.newsItem}>
                <span className={styles.date}>{item.date}</span>
                <div className={styles.content}>
                  <h2 className={styles.newsTitle}>
                    {item.emoji} {item.title}
                  </h2>
                  <p className={styles.description}>{item.description}</p>
                  <a href={item.link} className={styles.readMore}>
                    Read more &rarr;
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
