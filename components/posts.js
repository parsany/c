import { useState } from 'react';
import styles from '@/styles/Posts.module.css';
import Posts from '@/public/content/materials/PostsPage.json'; 
import { useRouter } from 'next/router';

export default function News() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  
  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((item) => item !== tag)
        : [...prevTags, tag]
    );
  };

  
  const filterByYear = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null); 
  };

  
  const filterByMonth = (month) => {
    setSelectedMonth(month);
  };

  
  const filterPosts = () => {
    return Posts.filter((post) => {
      const matchesSearch =
        post.title ||
        post.description;

      const matchesTags =
        selectedTags.length === 0 ||
        post.tags.some((tag) => selectedTags.includes(tag));

      const matchesYear =
        !selectedYear || new Date(post.date).getFullYear() === selectedYear;

      const matchesMonth =
        !selectedMonth ||
        new Date(post.date).getMonth() === selectedMonth;

      return matchesSearch && matchesTags && matchesYear && matchesMonth;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); 
  };

  const postsToShow = filterPosts();

  
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.contentWrapper}>
        {}
        <div className={styles.newsBox}>
          <div className={styles.newsList}>
            {postsToShow.map((item) => (
              <div
                key={item.id}
                className={styles.newsItem}
                onClick={() => handlePostClick(item.id)}
              >
                <span className={styles.date}>{item.date}</span>
                <div className={styles.content}>
                  <h2 className={styles.newsTitle}>
                    {item.emoji} {item.title}
                  </h2>
                  <p className={styles.description}>{item.description}</p>
                  <a className={styles.readMore}>Read more &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
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

          {}
          <div className={styles.searchBox}>
            <h3 className={styles.filterTitle}>Search</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
            />
          </div>

          {}
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

          {}
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

          {}
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
