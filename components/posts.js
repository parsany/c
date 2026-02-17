import { useState } from 'react';
import styles from '@/styles/Posts.module.css';
import Posts from '@/public/content/materials/PostsPage.json';
import { useRouter } from 'next/router';
import { Search, X, Calendar, Tag, ChevronDown } from 'lucide-react';
import { getTagColor } from '@/utils/tagColor';

export default function News() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((item) => item !== tag)
        : [...prevTags, tag]
    );
  };

  const filterByYear = (year) => {
    setSelectedYear(selectedYear === year ? null : year);
    setSelectedMonth(null);
  };

  const filterByMonth = (month) => {
    setSelectedMonth(selectedMonth === month ? null : month);
  };

  const filterPosts = () => {
    const searchWords = searchQuery
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    return Posts.filter((post) => {
      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((word) => {
          return (
            post.title.toLowerCase().includes(word) ||
            post.description.toLowerCase().includes(word)
          );
        });

      const matchesTags =
        selectedTags.length === 0 ||
        post.tags.some((tag) => selectedTags.includes(tag));

      const matchesYear =
        !selectedYear || new Date(post.date).getFullYear() === selectedYear;

      const matchesMonth =
        !selectedMonth || new Date(post.date).getMonth() === selectedMonth;

      return matchesSearch && matchesTags && matchesYear && matchesMonth;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const postsToShow = filterPosts();
  const postsToDisplay = postsToShow.slice(0, visibleCount);

  const allTags = [...new Set(Posts.flatMap((post) => post.tags))];
  const allYears = [...new Set(Posts.map((post) => new Date(post.date).getFullYear()))].sort(
    (a, b) => b - a
  );
  const availableMonths =
    selectedYear &&
    [...new Set(Posts.filter((post) => new Date(post.date).getFullYear() === selectedYear)
      .map((post) => new Date(post.date).getMonth()))].sort((a, b) => a - b);

  const router = useRouter();

  const handlePostClick = (id) => {
    router.push(`/posts/${id}`);
  };

  const handleViewMore = () => {
    setVisibleCount(visibleCount + 6);
  };

  const hasActiveFilters = selectedTags.length > 0 || searchQuery || selectedYear;

  const estimateReadTime = (post) => {
    const words = (post.body || '').split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blog Posts</h1>
        <p className={styles.subtitle}>Thoughts, tutorials, and explorations in software engineering</p>
      </div>

      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.postsList}>
            {postsToDisplay.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No posts match your filters.</p>
              </div>
            ) : (
              postsToDisplay.map((item) => (
                <article
                  key={item.id}
                  className={styles.postCard}
                  onClick={() => handlePostClick(item.id)}
                >
                  <div className={styles.postMeta}>
                    <time className={styles.postDate}>{formatDate(item.date)}</time>
                    <span className={styles.readTime}>{estimateReadTime(item)} min read</span>
                  </div>
                  <h2 className={styles.postTitle}>{item.title}</h2>
                  <p className={styles.postDescription}>{item.description}</p>
                  <div className={styles.postFooter}>
                    <div className={styles.postTags}>
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={styles.postTag}
                          style={{ backgroundColor: getTagColor(tag) }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={styles.readArticle}>Read article →</span>
                  </div>
                </article>
              ))
            )}
          </div>

          {visibleCount < postsToShow.length && (
            <div className={styles.viewMoreWrapper}>
              <button className={styles.viewMoreButton} onClick={handleViewMore}>
                Load more posts <ChevronDown size={16} />
              </button>
            </div>
          )}
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>
              <Search size={16} /> Search
            </h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>
              <Tag size={16} /> Tags
            </h3>
            <div className={styles.tags}>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`${styles.tag} ${selectedTags.includes(tag) ? styles.selectedTag : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>
              <Calendar size={16} /> Archive
            </h3>
            <div className={styles.yearList}>
              {allYears.map((year) => (
                <button
                  key={year}
                  className={`${styles.yearButton} ${selectedYear === year ? styles.activeYear : ''}`}
                  onClick={() => filterByYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>

            {selectedYear && availableMonths && availableMonths.length > 0 && (
              <div className={styles.monthList}>
                {availableMonths.map((month) => (
                  <button
                    key={month}
                    className={`${styles.monthButton} ${selectedMonth === month ? styles.activeMonth : ''}`}
                    onClick={() => filterByMonth(month)}
                  >
                    {new Date(0, month).toLocaleString('default', { month: 'long' })}
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button
              className={styles.clearButton}
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
                setSelectedYear(null);
                setSelectedMonth(null);
              }}
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
