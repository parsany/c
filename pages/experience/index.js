import styles from '@/styles/Experience.module.css';

export default function Experience(){
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Experience</h1>

      <div className={styles.job}>
        <div className={styles.jobHeader}>
          <h2 className={styles.jobTitle}>Director of Cloud Infrastructure</h2>
          <p className={styles.company}>GenCoin</p>
          <p className={styles.dates}>January 2021 - Present</p>
        </div>
        <p>Responsibilities include:</p>
        <ul className={styles.responsibilities}>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        </ul>
      </div>

      <div className={styles.job}>
        <div className={styles.jobHeader}>
          <h2 className={styles.jobTitle}>Backend Software Engineer</h2>
          <p className={styles.company}>X</p>
          <p className={styles.dates}>January 2016 - December 2020</p>
        </div>
        <p>Responsibilities include:</p>
        <ul className={styles.responsibilities}>
          <li>Migrated infrastructure to a new data center</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
        </ul>
      </div>

      <h1 className={styles.title}>Education</h1>

      <div className={styles.job}>
        <div className={styles.jobHeader}>
          <h2 className={styles.jobTitle}>PhD Artificial Intelligence</h2>
          <p className={styles.company}>Stanford University</p>
          <p className={styles.dates}>January 2016 - December 2020</p>
        </div>
      </div>
    </div>
  );
};