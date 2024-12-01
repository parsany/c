import MainCard from "../components/MainCard";
import Contact from "../components/contact";
import Projects from "../components/projects";
import Experience from "../components/experience";
import Skills from "../components/skills";
import Styles from "@/styles/Main.module.css";

//main card and experience are flawed
//fix the not fitting bug
// add boxes to elements

export default function Main() {
  return (
    <div className={Styles.container}>
      <div className={Styles.maincard}>
      <MainCard />
      </div>
      <div className={Styles.BoxContainer}>
        <Experience IsIsolated={false}/>
      </div>
      <div className={Styles.BoxContainer}>
        <Projects />
      </div>
      <div className={Styles.BoxContainer}>
        <Skills />
      </div>
      <div className={Styles.LastContainer}>
        <Contact />
      </div>
    </div>
  );
}
