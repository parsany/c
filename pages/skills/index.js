import Pagestyles from "@/styles/PageStyle.module.css";
import Skills from "@/components/skills";


export default function SkillsPage() {

  return (
    <div className={Pagestyles.container}>
      <Skills MainPage="true"/>
    </div>
  );
}
