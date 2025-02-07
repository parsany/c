import styles from "@/styles/UpdateBar.module.css";
import Link from "next/link";

export default function UpdateBar() {
  return (
    <div className={styles.updateBar}>
      <p>if you coming from the channel, the blog and <Link href="/materials" className={styles.link}>materials</Link> will be up soon!</p>
    </div>
  );
}

