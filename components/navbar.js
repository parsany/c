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
    { title: "Experience", href: "/experience" },
    { title: "Skills", href: "/skills" },
    { title: "Blog Posts", href: "/posts" },
    { title: "Materials", href: "/materials" },
    { title: "Projects", href: "/projects" },
    { title: "News", href: "/news" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={Styles.header} role="banner">
  <nav className={Styles.navbar} role="navigation">
    <Link href="/" className={Styles.logo} onClick={handleLinkClick}>
      <p>Phy</p>
    </Link>

    <div className={Styles.mobileControls}>
      <a onClick={toggleTheme} className={Styles.toggleMode}>
        <Image
          src={
            isDarkMode
              ? "/c/icons/dark_mode.svg"
              : "/c/icons/light_mode.svg"
          }
          alt="Toggle Icon"
          className={Styles.togglecolor}
          width={20}
          height={20}
        />
      </a>

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
        <a onClick={toggleTheme} className={Styles.toggleMode}>
          <Image
            src={
              isDarkMode
                ? "/c/icons/dark_mode.svg"
                : "/c/icons/light_mode.svg"
            }
            alt="Toggle Icon"
            className={Styles.togglecolor}
            width={20}
            height={20}
          />
        </a>
      </li>
    </ul>
  </nav>
</header>

  );
}
