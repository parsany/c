import { useState } from "react";
import styles from "@/styles/ProSkills.module.css";

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
      <h2>Professional Skills</h2>
      {professionalSkills.map((category, index) => (
        <div key={index} className={styles.category}>
          <div
            className={`${styles.header} ${
              expandedIndex === index ? styles.expanded : ""
            }`}
            onClick={() => toggleExpansion(index)}
          >
            <h3>{category.category}</h3>
            <span className={styles.arrow}>
              {expandedIndex === index ? "▲" : "▼"}
            </span>
          </div>
          {expandedIndex === index && (
            <div className={styles.content}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <h4>{item.name}</h4>
                    <span>{item.level}%</span>
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
          )}
        </div>
      ))}

<div className={styles.container}>
    <h2>Skills & Hobbies</h2>
    <div className={styles.sections}>
      <div className={styles.section}>
        <h3>Technical Skills</h3>
        <ul className={styles.list}>
          {['PYTHON', 'DATA SCIENCE', 'SQL'].map((skill, index) => (
            <li key={index} className={styles.item}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Hobbies</h3>
        <ul className={styles.list}>
          {['HIKING', 'CATS', 'PHOTOGRAPHY'].map((hobby, index) => (
            <li key={index} className={styles.item}>
              {hobby}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

    </div>
  );
};

export default ProfessionalSkills;

