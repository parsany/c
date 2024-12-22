import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Materials from '@/public/content/materials/MaterialsPage.json';
import styles from '@/styles/MaterialPage.module.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import Latex from 'react-latex-next';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // Dark theme
import 'katex/dist/katex.min.css';

export default function MaterialPage() {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (id) {
      const material = Materials.find(item => item.id === id);
      setContent(material);
    }
  }, [id]);

  if (!content) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{content.title}</h1>
        <div className={styles.content}>
          {content.body.map((block, index) => {
            switch (block.type) {
              case 'markdown':
                return (
                  <ReactMarkdown
                    key={index}
                    rehypePlugins={[rehypeRaw, rehypeSlug]}
                    remarkPlugins={[remarkGfm]}
                    className={styles.markdown}
                  >
                    {block.content}
                  </ReactMarkdown>
                );
              case 'spoiler':
                return (
                  <details key={index} className={styles.spoiler}>
                    <summary>{block.text}</summary>
                    <div>{block.content}</div>
                  </details>
                );
              case 'code':
                return (
                  <SyntaxHighlighter
                    key={index}
                    language={block.language}
                    style={oneDark} // Apply dark theme here
                    className={styles.codeBlock}
                  >
                    {block.content}
                  </SyntaxHighlighter>
                );
              case 'latex':
                return (
                  <div key={index} className={styles.latexBlock}>
                    <Latex>$${block.content}$$</Latex>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </main>

      {/* Right Pane Navigation */}
      <aside className={styles.rightPane}>
        <h2>Table of Contents</h2>
        <ul className={styles.toc}>
          {content.body
            .filter(block => block.type === 'markdown')
            .flatMap(block => block.content.match(/^#+\s.+/gm) || [])
            .map((heading, index) => {
              const headingText = heading.replace(/#/g, '').trim();
              const anchor = headingText.toLowerCase().replace(/\s+/g, '-');
              return (
                <li key={index}>
                  <a href={`#${anchor}`} className={styles.tocLink}>
                    {headingText}
                  </a>
                </li>
              );
            })}
        </ul>
      </aside>
    </div>
  );
}
