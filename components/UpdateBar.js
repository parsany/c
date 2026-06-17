import styles from "@/styles/UpdateBar.module.css";
import Link from "next/link";

export default function UpdateBar() {
  return (
    <div className={styles.updateBar}>
      <p>
        <Link href="/projects/professional" className={styles.link}>
          Explore my latest professional projects &rarr;
        </Link>
      </p>
    </div>
  );
}

