import styles from '@/styles/Languages.module.css';

export default function Languages() {
    
  const languages = [
    { percentage: 'English', name: 'Bilingual' },
    { percentage: 'Persian', name: 'Bilingual' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Languages</h1>
      <div className={styles.languageContainer}>
        {languages.map((lang, index) => (
          <div key={index} className={styles.languageCard}>
            <div className={styles.percentage}>{lang.percentage}</div>
            <p className={styles.languageName}>{lang.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};