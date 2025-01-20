import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Posts from '@/public/content/materials/PostsPage.json'; 
import styles from '@/styles/PostPage.module.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; 

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      const foundPost = Posts.find((item) => item.id === id);
      setPost(foundPost);
    }
  }, [id]);

  if (!post) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.content}>
        <div className={styles.body}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    language={match[1]}
                    style={oneDark}
                    className={styles.codeBlock}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={styles.inlineCode}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
