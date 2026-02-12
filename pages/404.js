import Link from "next/link";
import Head from "next/head";
import UpdateBar from "@/components/UpdateBar";
import styles from "@/styles/Error.module.css";
import Styles from "@/styles/Main.module.css";
import { FileQuestion } from "lucide-react";

export default function Custom404() {
  return (
    <div>
      <Head>
        <title>404 - Page Not Found | Parsa Ny</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      <UpdateBar />
      <div className={Styles.container} style={{ minHeight: 'calc(100vh - 150px)', justifyContent: 'center' }}>
        <div className={Styles.BoxContainer}>
          <FileQuestion size={80} color="#a0ffa0" strokeWidth={1.5} style={{ marginBottom: '20px' }} />
          
          <h2 className={styles.errorTitle}>Page Not Found</h2>
          
          <p className={styles.errorText}>
            Oops! It seems like the page you&apos;re looking for has moved or no longer exists. 
            Don&apos;t worry, you can always head back to the main page.
          </p>

          <Link href="/" className={styles.homeButton}>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
