import { useState } from "react";
import styles from "@/styles/ProSkills.module.css";
import Languages from "../../components/Languages";

const professionalSkills = [
  {
    category: "Languages",
    items: [
      { name: "English", level: 100 },
      { name: "Spanish", level: 80 },
      { name: "French", level: 60 },
    ],
  },
  {
    category: "Libraries & Frameworks (Backend)",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    category: "Frontend Development",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "CSS Modules", level: 85 },
    ],
  },
];

const ProfessionalSkills = () => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleExpansion = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Professional Skills</h2>
      <div className={styles.skillsWrapper}>
        {professionalSkills.map((category, index) => (
          <div key={index} className={styles.category}>
            <div
              className={`${styles.header} ${
                expandedIndex === index ? styles.expanded : ""
              }`}
              onClick={() => toggleExpansion(index)}
            >
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <span className={styles.arrow}>
                {expandedIndex === index ? "▲" : "▼"}
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
      <Languages />
    </div>
  );
};

export default ProfessionalSkills;