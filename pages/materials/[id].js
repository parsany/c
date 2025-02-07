import React, { useState, useMemo } from 'react';
import Materials from '@/public/content/materials/MaterialsPage.json';
import styles from '@/styles/MaterialPage.module.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import Latex from 'react-latex-next';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import 'katex/dist/katex.min.css';
import Link from 'next/link';

function NavigationPane({ materials, expanded, toggleExpand }) {
  return (
    <nav className={styles.leftPane} aria-label="Materials Navigation">
      <ul className={styles.navigation}>
        {materials.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <div className={styles.navHeader}>
              {item.children?.length > 0 && (
                <button
                  onClick={() => toggleExpand(item.id)}
                  className={styles.toggleButton}
                  aria-expanded={!!expanded[item.id]}
                  aria-controls={`children-${item.id}`}
                >
                  {expanded[item.id] ? '−' : '+'}
                </button>
              )}
              <Link href={`/materials/${item.id}`}>
                <p className={styles.navLink}>{item.title}</p>
              </Link>
            </div>
            {item.children?.length > 0 && expanded[item.id] && (
              <ul className={styles.subNavigation} id={`children-${item.id}`}>
                {item.children
                  .map((childId) => Materials.find((mat) => mat.id === childId))
                  .filter(Boolean)
                  .sort((a, b) => a.similar_index - b.similar_index)
                  .map((childItem) => (
                    <li key={childItem.id} className={styles.subNavItem}>
                      <Link href={`/materials/${childItem.id}`}>
                        <p className={styles.navLink}>{childItem.title}</p>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TableOfContents({ body }) {
  const headings = body
    .filter((block) => block.type === 'markdown')
    .flatMap((block) => block.content.match(/^#+\s.+/gm) || []);

  return (
    <aside className={styles.rightPane}>
      <h2>Table of Contents</h2>
      <ul className={styles.toc}>
        {headings.map((heading, index) => {
          const headingText = heading.replace(/#/g, '').trim();
          const anchor = headingText.toLowerCase().replace(/\s+/g, '-');
          return (
            <li key={index}>
              <Link href={`#${anchor}`} className={styles.tocLink}>
                {headingText}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function ContentRenderer({ content }) {
  return (
    <article className={styles.content}>
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
                style={oneDark}
                className={styles.codeBlock}
              >
                {block.content}
              </SyntaxHighlighter>
            );
          case 'latex':
            return (
              <div key={index} className={styles.latexBlock}>
                <Latex>{`$${block.content}$`}</Latex>
              </div>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}

export default function MaterialPage({ content }) {
  const [expanded, setExpanded] = useState({});
  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));


  const sortedMaterials = useMemo(() => {
    return Materials.filter((item) => item.similar_id === content.similar_id).sort(
      (a, b) => a.similar_index - b.similar_index
    );
  }, [content.similar_id]);

  if (!content) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <NavigationPane
        materials={sortedMaterials}
        expanded={expanded}
        toggleExpand={toggleExpand}
      />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{content.title}</h1>
        <ContentRenderer content={content} />
      </main>
      <TableOfContents body={content.body} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Materials.map((material) => ({
    params: { id: material.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const content = Materials.find((item) => item.id === params.id) || null;

  return {
    props: { content },
  };
}
