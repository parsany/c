import { useState, useEffect } from "react";
import styles from "@/styles/LatestWriting.module.css";
import Posts from "@/public/content/materials/PostsPage.json";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";

const TAG_COLORS = {
  "C++": "#e44d26",
  Simulation: "#6c63ff",
  Programming: "#2196f3",
  JavaScript: "#f7df1e",
  Closures: "#9c27b0",
  CSS: "#00bcd4",
  Grid: "#4caf50",
  "Web Design": "#ff9800",
  Promises: "#ff5722",
  Asynchronous: "#795548",
  Python: "#3776ab",
  Decorators: "#e91e63",
  React: "#61dafb",
  Hooks: "#00acc1",
  SQL: "#336791",
  Databases: "#8bc34a",
  publication: "#02c39a",
};

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

  const getTagColor = (tag) => {
    return TAG_COLORS[tag] || "#02c39a";
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
      <h2 className={styles.heading}>Latest Writing</h2>
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
