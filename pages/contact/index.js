import Styles from "@/styles/ContactPage.module.css";
import Contact from "../../components/contact";

export default function ContactPage() {
  return (
    <div className={Styles.outerContainer}>
        <Contact />
    </div>
  );
}
