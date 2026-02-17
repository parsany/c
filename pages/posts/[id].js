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
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { getTagColor } from '@/utils/tagColor';

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

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const estimateReadTime = () => {
    if (post.readTime) return post.readTime;
    const words = (post.body || '').split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Link href="/posts" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to posts
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <Calendar size={14} /> {formatDate(post.date)}
            </span>
            <span className={styles.metaItem}>
              <Clock size={14} /> {estimateReadTime()} min read
            </span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={styles.tag}
                  style={{ backgroundColor: getTagColor(tag) }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className={styles.divider} />

        <article className={styles.body}>
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
        </article>

        <div className={styles.divider} />

        <footer className={styles.footer}>
          <Link href="/posts" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to all posts
          </Link>
        </footer>
      </div>
    </div>
  );
}
