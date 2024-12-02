import styles from "@/styles/Hobbies.module.css";

const SkillsHobbies = () => {
  return (
    <div className={styles.hobbybox}>
      <h3 className={styles.subtitle}>Hobbies</h3>
      <ul className={styles.list}>
        <li>🚶‍♂️ HIKING</li>
        <li>🎸 Acoustic Guitar</li>
        <li>🎭 Cinephile</li>
      </ul>
    </div>
  );
};

export default SkillsHobbies;
