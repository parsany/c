import styles from "@/styles/Hobbies.module.css";

export default function SkillsHobbies(){
  return (
    <div className={styles.hobbybox}>
      <h3 className={styles.subtitle}>Hobbies</h3>
      <ul className={styles.list}>
        <li>🚶‍♂️ hiking</li>
        <li>🎸 Acoustic Guitar</li>
        <li>🎭 Movies</li>
      </ul>
    </div>
  );
}