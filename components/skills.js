import styles from "@/styles/SkillsPage.module.css";
import { ProSkills } from "@/public/JSONJS";
import { Terminal, Wrench, Globe, BookOpen, Code } from "lucide-react";
import Languages from "./Languages"; 

const ICON_MAP = {
  "Languages": { icon: Terminal, color: "16, 185, 129" }, // Emerald
  "AI & Data Science": { icon: BookOpen, color: "37, 99, 235" }, // Sapphire
  "Tools & DevOps": { icon: Wrench, color: "168, 85, 247" }, // Purple
  "Web Development": { icon: Globe, color: "236, 72, 153" }, // Pink
};

export default function Skills({ ShowSkills }) {
  const getCategoryConfig = (category) => {
    return ICON_MAP[category] || { icon: Code, color: "100, 116, 139" };
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Tech Stack</h2>
          <div className={styles.glow}></div>
        </div>
        <p className={styles.subtitle}>
          A curated selection of technologies and methodologies powering my research and development.
        </p>
        <div className={styles.titleDecoration}></div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {ProSkills.map((category, index) => {
          const { icon: Icon, color } = getCategoryConfig(category.category);
          
          return (
            <div 
              key={index} 
              className={styles.card}
              style={{ '--accent-rgb': color }}
            >
              {/* Texture Overlay */}
              <div className={styles.textureOverlay}></div>
              
              {/* Background Faint Icon */}
              <div className={styles.bgIcon}>
                <Icon size={96} strokeWidth={1} />
              </div>

              {/* Header */}
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <Icon size={20} />
                </div>
                <h3 className={styles.cardTitle}>{category.category}</h3>
              </div>

              {/* Skills List */}
              <div className={styles.skillsContainer}>
                {category.items.map((item, itemIndex) => (
                  <span key={itemIndex} className={styles.skillPill}>
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Spoken Languages Section */}
      <Languages />
    </div>
  );
}
