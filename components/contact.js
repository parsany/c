import Styles from "@/styles/Contact.module.css";

export default function Contact() {
    return (
            <div className={Styles.container}>
                <h1>Contact Me</h1>
                <div className={Styles.contactInfo}>
                    <p>Email: <a href="mailto:parsaniavand0 at gmail.com">parsaniavand0 at gmail.com</a></p>
                    <p>Telegram: <a href="https://t.me/velvetphy">at velvetphy</a></p>
                    <p>LinkedIn: <a href="https://www.linkedin.com/in/parsany/">linkedin.com/in/parsany</a></p>
                </div>
        </div>
    );
}
