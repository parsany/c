import React, { useState, useEffect } from 'react';
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
import Link from 'next/link';

export default function MaterialPage({ content }) {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter materials by the current page's similar_id
  const filteredMaterials = Materials.filter(
    (item) => item.similar_id === content.similar_id
  );

  // Sort materials and children by similar_index
  const sortedMaterials = filteredMaterials.sort(
    (a, b) => a.similar_index - b.similar_index
  );

  const renderLeftPane = (materials) => (
    <div className={styles.leftPane}>
      <ul className={styles.navigation}>
        {materials.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <div className={styles.navHeader}>
              {item.children.length > 0 && (
                <button
                  onClick={() => toggleExpand(item.id)}
                  className={styles.toggleButton}
                >
                  {expanded[item.id] ? '-' : '+'}
                </button>
              )}
              <Link href={`/materials/${item.id}`} className={styles.navLink}>
                {item.title}
              </Link>
            </div>
            {expanded[item.id] && item.children.length > 0 && (
              <ul className={styles.subNavigation}>
                {item.children
                  .map((child) => {
                    const childItem = Materials.find((mat) => mat.id === child);
                    return childItem;
                  })
                  .sort((a, b) => a.similar_index - b.similar_index)
                  .map((childItem) => (
                    <li key={childItem.id} className={styles.subNavItem}>
                      <Link href={`/materials/${childItem.id}`} className={styles.navLink}>
                        {childItem.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  if (!content) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      {renderLeftPane(sortedMaterials)}

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
                    style={oneDark}
                    className={styles.codeBlock}
                  >
                    {block.content}
                  </SyntaxHighlighter>
                );
              case 'latex':
                return (
                  <div key={index} className={styles.latexBlock}>
                    <Latex>${block.content}$</Latex>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </main>

      <aside className={styles.rightPane}>
        <h2>Table of Contents</h2>
        <ul className={styles.toc}>
          {content.body
            .filter((block) => block.type === 'markdown')
            .flatMap((block) => block.content.match(/^#+\s.+/gm) || [])
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

export async function getStaticPaths() {
  const paths = Materials.map((material) => ({
    params: { id: material.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const content = Materials.find((item) => item.id === params.id) || null;

  return {
    props: {
      content,
    },
  };
}
