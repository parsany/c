import styles from "@/styles/SkillsPage.module.css";
import { ProSkills } from "@/public/JSONJS";
import Languages from "./Languages"; 
import SkillsHobbies from "./hobbies"; 

export default function Skills( {ShowSkills}) {
  return (
    <div>
      <h2 className={styles.title}>Tech Stack</h2>
      <div className={styles.skillsWrapper}>
        {ProSkills.map((category, index) => (
          <div key={index} className={styles.category}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <div className={styles.skillsList}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.skillItem}>
                  <span className={styles.skillName}>{item.name}</span>
                  
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.itemrow}>
        <Languages />
        {/* {ShowSkills && <SkillsHobbies />} */}
      </div>
    </div>
  );
}
