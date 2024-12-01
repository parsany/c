import { useState } from "react";
import Link from "next/link";
import Styles from "@/styles/Navbar.module.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={Styles.header} role="banner">
      <nav className={Styles.navbar} role="navigation">
        
          <Link href="/" className={Styles.logo}>
            <p> Phy</p>
          </Link>
        

        <button
          className={`${Styles.hamburger} ${menuOpen ? Styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={Styles.line}></span>
          <span className={Styles.line}></span>
          <span className={Styles.line}></span>
        </button>

        <ul
          className={`${Styles.navlist} ${menuOpen ? Styles.navlistOpen : ""}`}
        >
          <li className={Styles.navitem}>
            <Link href="/projects">
              <p>Projects</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/skills">
              <p>Skills</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/experience">
              <p>Experience</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/posts">
              <p>Blog Posts</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/materials">
              <p>Materials</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/contact">
              <p>Contact</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// teaching, talks, publications, awards