import MainCard from "../components/MainCard";
import SkillsPage from "@/pages/skills/index";
import Experience from "@/pages/experience/index";
import Projects from "@/pages/projects/index";
import Contact from "../components/contact";
import Styles from "@/styles/Main.module.css";

//main card and experience are flawed
//fix the not fitting bug
// add boxes to elements

export default function Main(){
  return (
    <div className={Styles.container}>
      <MainCard />
      <div className={Styles.BoxContainer}>
      <SkillsPage />
      </div>
       <div className={Styles.BoxContainer}>
      <Experience />
      </div>
      <div className={Styles.BoxContainer}>
      <Projects />
      </div>
      <div className={Styles.Cardcontainer}>
        <Contact />
      </div>
    </div>
  );
};
