import styles from '@/styles/Languages.module.css';

export default function Languages() {
    
  const languages = [
    { name: 'English', percentage: 100 },
    { name: 'Chinese', percentage: 75 },
    { name: 'Portuguese', percentage: 25 },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Languages</h1>
      <div className={styles.languageContainer}>
        {languages.map((lang, index) => (
          <div key={index} className={styles.languageCard}>
            <div className={styles.percentage}>{lang.percentage}%</div>
            <p className={styles.languageName}>{lang.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};