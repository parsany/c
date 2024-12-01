import Styles from "@/styles/Contact.module.css";

export default function Contact() {
    return (
        <div className={Styles.outerContainer}>
            <div className={Styles.container}>
                <h1>Contact Me</h1>
                <div className={Styles.contactInfo}>
                    <p>Email: <a href="mailto:mail@gmail.com">mail@gmail.com</a></p>
                    <p>Telegram: <a href="https://t.me/fff">t.me/fff</a></p>
                    <p>LinkedIn: <a href="https://www.linkedin.com/in/fff/">linkedin.com/in/fff</a></p>
                    <p>Phone: <span className={Styles.phone}>+1234567890</span></p>
                    <p>Address: <span className={Styles.address}>123 Main St, Anytown, USA</span></p>
                </div>
            </div>
        </div>
    );
}
