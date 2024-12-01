import { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "@/styles/Navbar.module.css";
import Image from "next/image";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false); 
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
  };

  return (
    <header className={Styles.header} role="banner">
      <nav className={Styles.navbar} role="navigation">
        <Link href="/" className={Styles.logo} onClick={handleLinkClick}>
          <p>Phy</p>
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
            <Link href="/projects" onClick={handleLinkClick}>
              <p>Projects</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/skills" onClick={handleLinkClick}>
              <p>Skills</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/experience" onClick={handleLinkClick}>
              <p>Experience</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/posts" onClick={handleLinkClick}>
              <p>Blog Posts</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/materials" onClick={handleLinkClick}>
              <p>Materials</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <Link href="/contact" onClick={handleLinkClick}>
              <p>Contact</p>
            </Link>
          </li>
          <li className={Styles.navitem}>
            <button onClick={toggleTheme} aria-label="Toggle theme">
              <Image
                src={isDarkMode ? "/c/icons/dark_mode.svg" : "/c/icons/light_mode.svg"}
                alt="Toggle Icon"
                className={Styles.togglecolor}
                width={30}
                height={30}
              />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}


