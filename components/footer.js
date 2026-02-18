import Link from "next/link";
import Image from "next/image";
import Styles from "@/styles/Lowerpage.module.css";
import NavbarStyles from "@/styles/Navbar.module.css";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const isNotHome = router.pathname !== "/";

  return (
    <footer className={`${Styles.footer} ${isNotHome ? Styles.footerNotHome : ''}`}>
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

          <div className={Styles.navColumn}>
            <nav className={Styles.footerNav}>
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/CVB-iknowucanfindithere-smart!.pdf">Resume</Link>
              <Link href="/news">Contact</Link>
            </nav>
            <div className={Styles.socialLinks}>
              <a href="mailto:quantinitycorp@gmail.com" aria-label="Email" className={Styles.socialIcon}>
                <div className={Styles.iconMask} style={{ WebkitMaskImage: "url('/icons/mail.svg')", maskImage: "url('/icons/mail.svg')" }} />
              </a>
              <a href="https://twitter.com/payrimSp" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={Styles.socialIcon}>
                <div className={Styles.iconMask} style={{ WebkitMaskImage: "url('/icons/twitter.svg')", maskImage: "url('/icons/twitter.svg')" }} />
              </a>
              <a href="https://www.linkedin.com/parsany" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={Styles.socialIcon}>
                <div className={Styles.iconMask} style={{ WebkitMaskImage: "url('/icons/linkedin.svg')", maskImage: "url('/icons/linkedin.svg')" }} />
              </a>
              <a href="https://github.com/parsany" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={Styles.socialIcon}>
                <div className={Styles.iconMask} style={{ WebkitMaskImage: "url('/icons/github-mark.svg')", maskImage: "url('/icons/github-mark.svg')" }} />
              </a>
              <a href="https://t.me/parsanid" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className={Styles.socialIcon}>
                <div className={Styles.iconMask} style={{ WebkitMaskImage: "url('/icons/telegram.svg')", maskImage: "url('/icons/telegram.svg')" }} />
              </a>
            </div>
          </div>
        </div>
        <div className={Styles.divider} />
        <div className={Styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} Parsa Niavand. All website rights
            open. Made with Next.js, hosted over GitHub Pages.
          </p>
        </div>
      </div>
    </footer>
  );
}
