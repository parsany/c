import { useState } from 'react';
import styles from '@/styles/Posts.module.css';
import { NewsPost } from '@/public/JSONJS';

export default function News() {
  const [filteredPosts, setFilteredPosts] = useState(NewsPost);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Handle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((item) => item !== tag)
        : [...prevTags, tag]
    );
  };

  // Handle year selection
  const filterByYear = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null); // Reset selected month when the year is changed
  };

  // Handle month selection
  const filterByMonth = (month) => {
    setSelectedMonth(month);
  };

  // Filter posts based on search query, tags, and selected year/month
  const filterPosts = () => {
    return NewsPost.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        post.tags.some((tag) => selectedTags.includes(tag));

      const matchesYear =
        !selectedYear || new Date(post.date).getFullYear() === selectedYear;

      const matchesMonth =
        !selectedMonth ||
        new Date(post.date).getMonth() === selectedMonth;

      return matchesSearch && matchesTags && matchesYear && matchesMonth;
    });
  };

  const postsToShow = filterPosts();

  // Get unique tags
  const allTags = [...new Set(NewsPost.flatMap((post) => post.tags))];

  // Get available years for filtering
  const allYears = [...new Set(NewsPost.map((post) => new Date(post.date).getFullYear()))].sort(
    (a, b) => b - a
  );

  // Get available months for the selected year
  const availableMonths =
    selectedYear &&
    [...new Set(NewsPost.filter((post) => new Date(post.date).getFullYear() === selectedYear)
      .map((post) => new Date(post.date).getMonth()))].sort((a, b) => a - b);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.contentWrapper}>
        {/* Left Column for Posts */}
        <div className={styles.newsBox}>
          <div className={styles.newsList}>
            {postsToShow.map((item, index) => (
              <div key={index} className={styles.newsItem}>
                <span className={styles.date}>{item.date}</span>
                <div className={styles.content}>
                  <h2 className={styles.newsTitle}>
                    {item.emoji} {item.title}
                  </h2>
                  <p className={styles.description}>{item.description}</p>
                  <a href={item.link} className={styles.readMore}>
                    Read more &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel for Filters */}
        <div className={styles.rightPanel}>
          <div className={styles.tagsBox}>
            <h3 className={styles.filterTitle}>Tags</h3>
            <div className={styles.tags}>
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className={`${styles.tag} ${selectedTags.includes(tag) ? styles.selectedTag : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className={styles.searchBox}>
            <h3 className={styles.filterTitle}>Search</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
            />
          </div>

          {/* Year Filter */}
          <div className={styles.yearMonthBox}>
            <h3 className={styles.filterTitle}>Year</h3>
            <div className={styles.yearList}>
              {allYears.map((year) => (
                <button
                  key={year}
                  className={styles.yearButton}
                  onClick={() => filterByYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Month Filter (conditional) */}
          {selectedYear && availableMonths.length > 0 && (
            <div className={styles.monthList}>
              <h3 className={styles.filterTitle}>Month</h3>
              {availableMonths.map((month) => (
                <button
                  key={month}
                  className={styles.monthButton}
                  onClick={() => filterByMonth(month)}
                >
                  {new Date(0, month).toLocaleString('default', { month: 'long' })}
                </button>
              ))}
            </div>
          )}

          {/* Clear Filters Button */}
          <button
            className={styles.clearButton}
            onClick={() => {
              setSearchQuery('');
              setSelectedTags([]);
              setSelectedYear(null);
              setSelectedMonth(null);
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
