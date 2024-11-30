import styles from '@/styles/Languages.module.css';

export default function Languages() {
  const languages = [
    {  name: 'English', proficiency: 'Bilingual' },
    {  name: 'Persian', proficiency: 'Bilingual' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Languages</h1>
      <div className={styles.languageContainer}>
        {languages.map((lang, index) => (
          <div
            key={index}
            className={styles.languageCard}
            aria-label={`${lang.name} - ${lang.proficiency} (${lang.percentage})`}
          >
            <div className={styles.languageName}>{lang.name}</div>
            <p className={styles.proficiency}>{lang.proficiency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}