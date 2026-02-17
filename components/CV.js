import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import styles from "@/styles/CV.module.css";

export default function CV({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        
        <p className={styles.cvNotice}>
          This CV is redacted as it is outdated. Please contact me for my current resume.
        </p>
        
        <div className={styles.cvImageFrame}>
          <Image
            src="/content/cv.png"
            alt="CV Preview"
            className={styles.cvPreview}
            width={400}
            height={560}
            priority
          />
        </div>
        
        <div className={styles.cvButtonsRow}>
          <button className={styles.downloadCV}>
            <a href="/CVR-iknowucanfindithere-smart!.pdf" target="_blank" rel="noopener noreferrer">
              Academic CV
            </a>
          </button>
          <button className={styles.downloadCV}>
            <a href="/CVB-iknowucanfindithere-smart!.pdf" target="_blank" rel="noopener noreferrer">
              Business CV
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
