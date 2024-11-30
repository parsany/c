import Experience from "../../components/experience";
import styles from "@/styles/PageStyle.module.css";

export default function ExperiencePage() {
  return (
    <div className={styles.container}>
      <Experience IsIsolated={true}/>
    </div>
  );
}
