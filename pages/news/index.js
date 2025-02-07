import Styles from "@/styles/PageStyle.module.css";
import Contact from "../../components/contact";
import News from "../../components/news"

export default function ContactPage() {
  return (
    <div className={Styles.outerContainer}>
        <News />
        <Contact/>
    </div>
  );
}
