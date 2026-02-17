import Styles from "@/styles/Contact.module.css";
import { Mail, Send, Linkedin, ExternalLink } from 'lucide-react';

export default function Contact() {
    return (
        <section className={Styles.container}>
            <div className={Styles.header}>
                <h1 className={Styles.title}>Get in Touch</h1>
                <p className={Styles.subtitle}>Feel free to reach out for collaborations or just a friendly hello</p>
            </div>
            
            <div className={Styles.grid}>
                <a href="mailto:quantinitycorp@gmail.com" className={Styles.card}>
                    <div className={Styles.iconBox}>
                        <Mail size={24} />
                    </div>
                    <div className={Styles.content}>
                        <h3>Email</h3>
                        <p>quantinitycorp@gmail.com</p>
                    </div>
                    <ExternalLink className={Styles.arrow} size={16} />
                </a>

                <a href="https://t.me/parsanid" target="_blank" rel="noopener noreferrer" className={Styles.card}>
                    <div className={Styles.iconBox}>
                        <Send size={24} />
                    </div>
                    <div className={Styles.content}>
                        <h3>Telegram</h3>
                        <p>@parsanid</p>
                    </div>
                    <ExternalLink className={Styles.arrow} size={16} />
                </a>

                <a href="https://www.linkedin.com/in/parsany/" target="_blank" rel="noopener noreferrer" className={Styles.card}>
                    <div className={Styles.iconBox}>
                        <Linkedin size={24} />
                    </div>
                    <div className={Styles.content}>
                        <h3>LinkedIn</h3>
                        <p>parsany</p>
                    </div>
                    <ExternalLink className={Styles.arrow} size={16} />
                </a>
            </div>
        </section>
    );
}
