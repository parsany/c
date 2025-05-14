import { useState, useEffect } from 'react';
import styles from '@/styles/Posts.module.css';
import Posts from '@/public/content/materials/PostsPage.json';
import { useRouter } from 'next/router';

export default function RandomPost() {
  const [recentPosts, setRecentPosts] = useState([]);

  const router = useRouter();

  
  const getLastThreePosts = () => {
    
    const sortedPosts = Posts
    .filter(post => post.tags && !(post.tags.includes('publication')))
    .sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    setRecentPosts(sortedPosts);
  };

  useEffect(() => {
    getLastThreePosts(); 
  }, []);

  
  const handlePostClick = (id) => {
    router.push(`/posts/${id}`);
  };

  return (
    <div className={styles.randomPostBox}>
      <h2 className={styles.title}>Latest Posts</h2>
      <div className={styles.newsList}>
        {recentPosts.length === 0 ? (
          <div>Loading...</div> 
        ) : (
          recentPosts.map((post) => (
            <div
              key={post.id}
              className={styles.newsItem}
              onClick={() => handlePostClick(post.id)}
            >
              <span className={styles.date}>
                {new Date(post.date).toLocaleDateString()}
              </span>
              <div className={styles.content}>
                <h2 className={styles.newsTitle}>
                  {post.emoji} {post.title}
                </h2>
                <p className={styles.description}>{post.description}</p>
                <a className={styles.readMore}>Read more &rarr;</a>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.morePostsButton}
          onClick={() => router.push('/posts')}
        >
          More Posts
        </button>
      </div>
    </div>
  );
}
