import styles from "@/styles/ResearchInterests.module.css";
import { Brain, Bot, Dna } from "lucide-react";

const INTERESTS = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Developing intelligent systems through artificial intelligence and deep learning models, with innovations in computational modeling.",
  },
  {
    icon: Bot,
    title: "Robotics and Simulation",
    description:
      "Robotics and simulation modeling through research and innovative technical solutions.",
  },
  {
    icon: Dna,
    title: "Artificial Life",
    description:
      "Exploring artificial life through robotics, computational evolution, and innovative technical methods.",
  },
];

export default function ResearchInterests() {
  return (
    <section className={styles.section} id="research">
      <h2 className={styles.heading}>Research Interests</h2>
      <p className={styles.subtitle}>
        Learn more about the research areas I&apos;m passionate about
      </p>
      <div className={styles.grid}>
        {INTERESTS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.title} className={styles.card}>
              <div className={styles.iconWrapper}>
                <IconComponent size={40} strokeWidth={1.5} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
