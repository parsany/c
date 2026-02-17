import { useState, useEffect } from "react";
import styles from "@/styles/LatestWriting.module.css";
import Posts from "@/public/content/materials/PostsPage.json";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import { getTagColor } from "@/utils/tagColor";

export default function LatestWriting() {
  const [recentPosts, setRecentPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const sortedPosts = Posts.filter(
      (post) => post.tags && !post.tags.includes("publication")
    )
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 3);
    setRecentPosts(sortedPosts);
  }, []);

  const handlePostClick = (id) => {
    router.push(`/posts/${id}`);
  };

  const estimateReadTime = (post) => {
    if (post.readTime) return post.readTime;
    const words = (post.body || "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDateParts = (dateStr) => {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: String(d.getDate()).padStart(2, "0"),
    };
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Latest Writings</h2>
      <div className={styles.list}>
        {recentPosts.map((post) => {
          const { month, day } = formatDateParts(post.date);
          const firstTag = post.tags?.[0];
          const readTime = estimateReadTime(post);

          return (
            <article
              key={post.id}
              className={styles.item}
              onClick={() => handlePostClick(post.id)}
            >
              <div className={styles.dateBox}>
                <span className={styles.dateMonth}>{month}</span>
                <span className={styles.dateDay}>{day}</span>
              </div>
              <div className={styles.itemContent}>
                <div className={styles.meta}>
                  {firstTag && (
                    <span
                      className={styles.tagPill}
                      style={{ backgroundColor: getTagColor(firstTag) }}
                    >
                      {firstTag}
                    </span>
                  )}
                  <span className={styles.readTime}>{readTime} min read</span>
                </div>
                <h3 className={styles.itemTitle}>{post.title}</h3>
                <p className={styles.itemDescription}>{post.description}</p>
                <span className={styles.readArticle}>Read article</span>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.viewAll}>
        <button
          className={styles.viewAllBtn}
          onClick={() => router.push("/posts")}
        >
          View all publications <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
