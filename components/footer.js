import Link from "next/link";
import Styles from "@/styles/Lowerpage.module.css";
import NavbarStyles from "@/styles/Navbar.module.css"; // Import navbar styles for the logo font

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.footerInner}>
        <div className={Styles.footerTop}>
          <div className={Styles.brand}>
            {/* Replicating the Navbar logo style */}
            <Link href="/" className={NavbarStyles.logo} style={{ fontSize: '2rem', marginBottom: '10px', display: 'block' }}>
              Phy
            </Link>
            <p className={Styles.tagline}>
              Building intelligent systems for the future.
            </p>
          </div>
          <nav className={Styles.footerNav}>
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/CVB-iknowucanfindithere-smart!.pdf">Resume</Link>
            <Link href="/news">Contact</Link>
          </nav>
        </div>
        <div className={Styles.divider} />
        <div className={Styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} Parsa Niavand. All website rights
            open. Made with Next.js, hosted over Github Pages.
          </p>
        </div>
      </div>
    </footer>
  );
}
