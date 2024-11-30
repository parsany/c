import styles from '@/styles/Posts.module.css';

const news = [
  {
    date: 'Oct 27, 2023',
    emoji: '🎉',
    title: 'Easily create your own simple yet highly customizable blog',
    description:
      'Take full control of your personal brand and privacy by migrating away from the big tech platforms!',
    link: '#',
  },
  {
    date: 'Oct 26, 2023',
    emoji: '🧠',
    title: 'Sharpen your thinking with a second brain',
    description:
      'Create a personal knowledge base and share your knowledge with your peers.',
    link: '#',
  },
  {
    date: 'Oct 25, 2023',
    emoji: '📊',
    title: 'Communicate your results effectively with the best data visualizations',
    description:
      'Use popular tools such as Plotly, Mermaid, and data frames.',
    link: '#',
  },
];

export default function RecentNews() {
  return (
    <div className={styles.newsContainer}>
      <h1 className={styles.heading}>Recent News</h1>
      <div className={styles.newsList}>
        {news.map((item, index) => (
          <div key={index} className={styles.newsItem}>
            <span className={styles.date}>{item.date}</span>
            <div className={styles.content}>
              <h2 className={styles.title}>
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
  );
}
