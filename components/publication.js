// components/Publications.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Posts from '@/public/content/materials/PostsPage.json';
import styles from '@/styles/Publications.module.css';

export default function Publications() {
  const [pubPosts, setPubPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const filtered = Posts
      .filter(post => post.tags && post.tags.includes('publication'))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setPubPosts(filtered);
  }, []);

  const handleClick = id => router.push(`/posts/${id}`);

  return (
    <section className={styles.publicationsSection}>
      <h2 className={styles.heading}>Publications</h2>
      <div className={styles.grid}>
        {pubPosts.map(post => (
          <article
            key={post.id}
            className={styles.card}
            onClick={() => handleClick(post.id)}
          >
            {post.image && (
              <div className={styles.imageWrapper}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.image}
                />
              </div>
            )}
            <div className={styles.info}>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.date}>
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
              <p className={styles.description}>{post.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
