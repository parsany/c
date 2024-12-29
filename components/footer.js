import Styles from "@/styles/Lowerpage.module.css";

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <p className={Styles.copyright}>
          Copyright {new Date().getFullYear()} Parsa ny - All rights open
        </p>
        <p>
          Made with Next.js, hosted over Github Pages
        </p>
      </div>
    </footer>
  );
}
