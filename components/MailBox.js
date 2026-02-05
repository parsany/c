import Styles from "@/styles/MailBox.module.css";

export default function MailPage({onClose}){
    return(
        <div className={Styles.overlay} onClick={onClose}>
            <div className={Styles.mailbox}  onClick={e => e.stopPropagation()}>
                <p className={Styles.email}>
                    quantinitycorp at gmail.com
                </p>
            </div>
        </div>
    )
}