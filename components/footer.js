import Styles from "@/styles/Lowerpage.module.css";

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <p>Copyright {new Date().getFullYear()} - All rights open</p>
      </div>
    </footer>
  );
}
