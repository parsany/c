import { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "@/styles/Navbar.module.css";
import { Sun, Moon } from "lucide-react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const NAV_LINKS = [
    { title: "Projects", href: "/projects" },
    { title: "Skills", href: "/skills" },
    { title: "Experience", href: "/experience" },
    { title: "Blog Posts", href: "/posts" },
    { title: "Materials", href: "/materials" },
    { title: "News", href: "/news" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={Styles.header} role="banner">
      <nav className={Styles.navbar} role="navigation">
        <div className={Styles.logoContainer}>
          <Link href="/" className={Styles.logo} onClick={handleLinkClick}>
            <p>Phy</p>
          </Link>
        </div>

        <div className={Styles.mobileControls}>
          <button
            onClick={toggleTheme}
            className={Styles.themeToggleBtn}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className={`${Styles.hamburger} ${menuOpen ? Styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={Styles.line}></span>
            <span className={Styles.line}></span>
            <span className={Styles.line}></span>
          </button>
        </div>

        <ul
          className={`${Styles.navlist} ${menuOpen ? Styles.navlistOpen : ""}`}
        >
          {NAV_LINKS.map(({ title, href }) => (
            <li key={href} className={Styles.navitem}>
              <Link href={href} onClick={handleLinkClick}>
                <p>{title}</p>
              </Link>
            </li>
          ))}

          <li className={Styles.navitem}>
            <Link
              href="/CVB-iknowucanfindithere-smart!.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={Styles.cvButton}
            >
              CV
            </Link>
          </li>

          <li className={`${Styles.navitem} ${Styles.desktopThemeToggle}`}>
            <button
              onClick={toggleTheme}
              className={Styles.themeToggleBtn}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
