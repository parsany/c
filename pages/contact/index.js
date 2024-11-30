import Styles from "@/styles/PageStyle.module.css";
import Contact from "../../components/contact";

export default function ContactPage() {
  return (
    <div className={Styles.outerContainer}>
        <Contact />
    </div>
  );
}
