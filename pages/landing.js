import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Styles from "@/styles/Landing.module.css";
import { ArrowRight, Code2, Brain, Rocket, Mail, Github, Linkedin, Twitter, FileText, Sparkles, Zap, Target } from "lucide-react";

export default function Landing() {
  return (
    <div className={Styles.page}>
      <Head>
        <title>Parsa Niavand | Software Engineer & Researcher</title>
        <meta
          name="description"
          content="Discover Parsa Niavand&apos;s expertise in software engineering, AI, and robotics. Explore projects, research, and professional experience."
        />
        <meta
          name="keywords"
          content="Parsa Niavand, software engineer, AI researcher, robotics, full-stack developer, portfolio"
        />
        <meta property="og:title" content="Parsa Niavand | Software Engineer & Researcher" />
        <meta
          property="og:description"
          content="Building intelligent systems for tomorrow. Explore my work in AI, robotics, and software engineering."
        />
        <link rel="canonical" href="https://parsany.github.io/c/landing" />
      </Head>

      {/* Hero Section */}
      <section className={Styles.hero}>
        <div className={Styles.heroBackground}>
          <div className={Styles.gradientOverlay}></div>
        </div>
        <div className={Styles.heroContent}>
          <div className={Styles.heroText}>
            <div className={Styles.badge}>
              <Sparkles size={14} />
              <span>Available for Opportunities</span>
            </div>
            <h1 className={Styles.heroTitle}>
              Building <span className={Styles.highlight}>Intelligent Systems</span> for Tomorrow
            </h1>
            <p className={Styles.heroSubtitle}>
              I&apos;m Parsa Niavand, a software engineer and researcher passionate about 
              AI, robotics, and creating technology that makes a difference. 
              Let&apos;s build something remarkable together.
            </p>
            <div className={Styles.heroCTA}>
              <Link href="/projects" className={Styles.primaryBtn}>
                <span>Explore My Work</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/CVB-iknowucanfindithere-smart!.pdf" className={Styles.secondaryBtn}>
                <FileText size={18} />
                <span>View Resume</span>
              </Link>
            </div>
            <div className={Styles.heroStats}>
              <div className={Styles.statItem}>
                <span className={Styles.statNumber}>15+</span>
                <span className={Styles.statLabel}>Projects Delivered</span>
              </div>
              <div className={Styles.statDivider}></div>
              <div className={Styles.statItem}>
                <span className={Styles.statNumber}>4+</span>
                <span className={Styles.statLabel}>Years Experience</span>
              </div>
              <div className={Styles.statDivider}></div>
              <div className={Styles.statItem}>
                <span className={Styles.statNumber}>3</span>
                <span className={Styles.statLabel}>Research Areas</span>
              </div>
            </div>
          </div>
          <div className={Styles.heroVisual}>
            <div className={Styles.imageContainer}>
              <Image
                src="/content/main.jpg"
                alt="Parsa Niavand"
                fill
                className={Styles.profileImage}
                priority
              />
              <div className={Styles.imageRing}></div>
            </div>
            <div className={Styles.floatingCard}>
              <Code2 size={20} />
              <span>Full-Stack Developer</span>
            </div>
          </div>
        </div>
        <div className={Styles.scrollIndicator}>
          <div className={Styles.scrollDot}></div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className={Styles.valueSection}>
        <div className={Styles.container}>
          <div className={Styles.sectionHeader}>
            <h2 className={Styles.sectionTitle}>What I Bring to the Table</h2>
            <p className={Styles.sectionSubtitle}>
              A unique blend of technical expertise, research mindset, and creative problem-solving
            </p>
          </div>
          <div className={Styles.valueGrid}>
            <div className={Styles.valueCard}>
              <div className={Styles.valueIcon}>
                <Code2 size={28} />
              </div>
              <h3>Full-Stack Excellence</h3>
              <p>
                From elegant frontends to robust backends, I architect and build 
                scalable applications using modern technologies like React, Next.js, 
                Node.js, and Python.
              </p>
            </div>
            <div className={Styles.valueCard}>
              <div className={Styles.valueIcon}>
                <Brain size={28} />
              </div>
              <h3>AI & Research</h3>
              <p>
                Deep expertise in artificial intelligence, deep learning, and 
                computational modeling. I transform complex research into 
                practical, impactful solutions.
              </p>
            </div>
            <div className={Styles.valueCard}>
              <div className={Styles.valueIcon}>
                <Rocket size={28} />
              </div>
              <h3>Robotics & Simulation</h3>
              <p>
                Experience in robotics systems and simulation environments. 
                I bridge the gap between theoretical models and real-world 
                applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className={Styles.featuredSection}>
        <div className={Styles.container}>
          <div className={Styles.sectionHeader}>
            <h2 className={Styles.sectionTitle}>Featured Work</h2>
            <p className={Styles.sectionSubtitle}>
              A selection of projects that showcase my skills and passion
            </p>
          </div>
          <div className={Styles.featuredGrid}>
            <div className={Styles.featuredCard}>
              <div className={Styles.featuredImage}>
                <Image
                  src="/projects/anomaly.png"
                  alt="Anomaly Detection System"
                  fill
                  className={Styles.projectImg}
                />
              </div>
              <div className={Styles.featuredContent}>
                <div className={Styles.featuredTags}>
                  <span className={Styles.tag}>AI/ML</span>
                  <span className={Styles.tag}>Python</span>
                </div>
                <h3>Anomaly Detection System</h3>
                <p>
                  Machine learning-based system for detecting anomalies in 
                  complex datasets with real-time processing capabilities.
                </p>
                <Link href="/projects" className={Styles.featuredLink}>
                  View Project <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className={Styles.featuredCard}>
              <div className={Styles.featuredImage}>
                <Image
                  src="/projects/QtLib.png"
                  alt="Qt Library Application"
                  fill
                  className={Styles.projectImg}
                />
              </div>
              <div className={Styles.featuredContent}>
                <div className={Styles.featuredTags}>
                  <span className={Styles.tag}>C++</span>
                  <span className={Styles.tag}>Qt</span>
                </div>
                <h3>Qt Library Application</h3>
                <p>
                  Cross-platform desktop application built with Qt framework 
                  featuring modern UI and efficient data management.
                </p>
                <Link href="/projects" className={Styles.featuredLink}>
                  View Project <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          <div className={Styles.viewAllWrapper}>
            <Link href="/projects" className={Styles.viewAllBtn}>
              View All Projects
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Highlight Section */}
      <section className={Styles.experienceSection}>
        <div className={Styles.container}>
          <div className={Styles.experienceGrid}>
            <div className={Styles.experienceText}>
              <h2 className={Styles.sectionTitle}>Professional Journey</h2>
              <p className={Styles.experienceDesc}>
                From UI/UX design to leading full-stack development, my career 
                has been a journey of continuous growth and impact. Currently 
                serving as Lead Full-Stack Developer at Codeafzar Codesheen, 
                where I manage 7+ projects and drive technical innovation.
              </p>
              <div className={Styles.experienceHighlights}>
                <div className={Styles.highlightItem}>
                  <Zap size={20} />
                  <span>Led 7+ concurrent projects to successful delivery</span>
                </div>
                <div className={Styles.highlightItem}>
                  <Target size={20} />
                  <span>Architected scalable backend systems</span>
                </div>
                <div className={Styles.highlightItem}>
                  <Sparkles size={20} />
                  <span>Designed complex UI/UX workflows</span>
                </div>
              </div>
              <Link href="/experience" className={Styles.experienceBtn}>
                View Full Experience
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className={Styles.experienceVisual}>
              <div className={Styles.timelinePreview}>
                <div className={Styles.timelineItem}>
                  <div className={Styles.timelineDot}></div>
                  <div className={Styles.timelineContent}>
                    <span className={Styles.timelineRole}>Lead Full-Stack Developer</span>
                    <span className={Styles.timelineCompany}>Codeafzar Codesheen</span>
                    <span className={Styles.timelineDate}>2025 - Present</span>
                  </div>
                </div>
                <div className={Styles.timelineItem}>
                  <div className={Styles.timelineDot}></div>
                  <div className={Styles.timelineContent}>
                    <span className={Styles.timelineRole}>Back-end Developer</span>
                    <span className={Styles.timelineCompany}>Codeafzar Codesheen</span>
                    <span className={Styles.timelineDate}>2024 - 2025</span>
                  </div>
                </div>
                <div className={Styles.timelineItem}>
                  <div className={Styles.timelineDot}></div>
                  <div className={Styles.timelineContent}>
                    <span className={Styles.timelineRole}>Front-end Developer</span>
                    <span className={Styles.timelineCompany}>Codeafzar Codesheen</span>
                    <span className={Styles.timelineDate}>2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className={Styles.skillsSection}>
        <div className={Styles.container}>
          <div className={Styles.sectionHeader}>
            <h2 className={Styles.sectionTitle}>Technical Arsenal</h2>
            <p className={Styles.sectionSubtitle}>
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>
          <div className={Styles.skillsGrid}>
            <div className={Styles.skillCategory}>
              <h4>Frontend</h4>
              <div className={Styles.skillTags}>
                <span>React</span>
                <span>Next.js</span>
                <span>TypeScript</span>
                <span>Tailwind CSS</span>
                <span>Redux</span>
              </div>
            </div>
            <div className={Styles.skillCategory}>
              <h4>Backend</h4>
              <div className={Styles.skillTags}>
                <span>Node.js</span>
                <span>Python</span>
                <span>Express</span>
                <span>Django</span>
                <span>PostgreSQL</span>
              </div>
            </div>
            <div className={Styles.skillCategory}>
              <h4>AI & Research</h4>
              <div className={Styles.skillTags}>
                <span>TensorFlow</span>
                <span>PyTorch</span>
                <span>OpenCV</span>
                <span>NumPy</span>
                <span>Scikit-learn</span>
              </div>
            </div>
            <div className={Styles.skillCategory}>
              <h4>Tools & Others</h4>
              <div className={Styles.skillTags}>
                <span>Git</span>
                <span>Docker</span>
                <span>Linux</span>
                <span>Figma</span>
                <span>Qt</span>
              </div>
            </div>
          </div>
          <div className={Styles.skillsCTA}>
            <Link href="/skills" className={Styles.skillsLink}>
              View All Skills <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={Styles.ctaSection}>
        <div className={Styles.container}>
          <div className={Styles.ctaContent}>
            <h2>Let&apos;s Build Something Together</h2>
            <p>
              Whether you have a project in mind, want to collaborate on research, 
              or just want to say hello — I&apos;d love to hear from you.
            </p>
            <div className={Styles.ctaButtons}>
              <Link href="mailto:quantinitycorp@gmail.com" className={Styles.ctaPrimary}>
                <Mail size={18} />
                <span>Get In Touch</span>
              </Link>
              <div className={Styles.socialLinks}>
                <a href="https://github.com/parsany" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/parsany" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://twitter.com/payrimSp" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
