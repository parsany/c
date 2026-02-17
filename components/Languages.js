import styles from '@/styles/Languages.module.css';
import { Globe, Languages as LangIcon } from 'lucide-react';

export default function Languages() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Spoken Languages</h2>
        <div className={styles.separator}></div>
      </div>

      <div className={styles.mapCard}>
        <div className={styles.mapBackground}></div>
        
        <div className={styles.grid}>
          {/* English */}
          <div className={styles.langItem}>
            <div className={styles.iconCircle}>
              <Globe className={styles.icon} size={32} />
            </div>
            <h3 className={styles.langName}>English</h3>
            <p className={styles.proficiency}>Bilingual Proficiency</p>
          </div>

          {/* Persian */}
          <div className={styles.langItem}>
            <div className={styles.iconCircle}>
              <LangIcon className={styles.icon} size={32} />
            </div>
            <h3 className={styles.langName}>Persian</h3>
            <p className={styles.proficiency}>Native / Bilingual</p>
          </div>
        </div>
      </div>
    </div>
  );
}