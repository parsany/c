import Styles from "@/styles/MailBox.module.css";

export default function MailPage({onClose}){
    return(
        <div className={Styles.overlay} onClick={onClose}>
            <div className={Styles.mailbox}  onClick={e => e.stopPropagation()}>
                <p className={Styles.email}>
                    parsaniavand0 at gmail.com
                </p>
            </div>
        </div>
    )
}