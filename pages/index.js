import MainCard from "../components/MainCard";
import Contact from "../components/contact";
import Experience from "../components/experience";
import Projects from "../components/projects";
import Skills from "../components/skills";
import Styles from "@/styles/Main.module.css";
import UpdateBar from "../components/UpdateBar";

//TODO: resposive
//TODO: dark mode/light mode
//TODO: animations for pages

export default function Main() {
  return (
    <div>
      <UpdateBar/>
    <div className={Styles.container}>
      <div className={Styles.maincard}>
      <MainCard />
      </div>
      <div className={Styles.BoxContainer}>
        <Projects NumberShown={3}/>
      </div>
    </div>
    </div>
  );
}
