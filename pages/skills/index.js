import { useState } from "react";
import styles from "@/styles/SkillsPage.module.css";
import Languages from "../../components/Languages";
import SkillsHobbies from "../../components/hobbies";
import { ProSkills } from "@/public/JSONJS";


export default function SkillsPage() {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleExpansion = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tech Stack</h2>
      <div className={styles.skillsWrapper}>
        {ProSkills.map((category, index) => (
          <div key={index} className={styles.category}>
            <div
              className={`${styles.header} ${
                expandedIndex === index ? styles.expanded : ""
              }`}
              onClick={() => toggleExpansion(index)}
            >
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <span
                className={`${styles.arrow} ${
                  expandedIndex === index ? styles.rotated : ""
                }`}
              >
                ▼
              </span>
            </div>
            <div
              className={`${styles.content} ${
                expandedIndex === index ? styles.show : styles.hide
              }`}
            >
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <span className={styles.itemLevel}>{item.level}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressBarFill}
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.itemrow}>
      <Languages />
      <SkillsHobbies/>
      </div>
    </div>
  );
}
