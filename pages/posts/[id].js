import React from 'react';
import Posts from '@/public/content/materials/PostsPage.json'; // Adjust path as needed
import styles from '@/styles/PostPage.module.css'; // We'll write the CSS below

export default function PostPage({ post }) {
  if (!post) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{post.name}</h1>
        <div className={styles.body}>
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Posts.map((post) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = Posts.find((item) => item.id === params.id) || null;

  return {
    props: {
      post,
    },
  };
}
