import Head from "next/head";
import MainCard from "../components/MainCard";
import ResearchInterests from "../components/researchInterests";
import Projects from "../components/projects";
import Styles from "@/styles/Main.module.css";
import RandomPost from "@/components/randomPost";
import Publications from "../components/publication";
import UpdateBar from "@/components/UpdateBar";
import Posts from "@/public/content/materials/PostsPage.json";

export default function Main() {
  const hasPublications = Posts.some(
    (post) => post.tags && post.tags.includes("publication")
  );

  return (
    <div>
      <Head>
        <title>Parsa Ny</title>
        <meta
          name="description"
          content="Parsa Ny's personal portfolio featuring projects, experience, and blog posts about software engineering and technology."
        />
        <meta
          name="keywords"
          content="Parsa Ny, software engineer, portfolio, projects, blog"
        />
        <meta property="og:title" content="Parsa Ny | Portfolio & Blog" />
        <meta
          property="og:description"
          content="Discover Parsa Ny's projects and experience in software development."
        />
        <link rel="canonical" href="https://parsany.github.io/c/" />
      </Head>

      <UpdateBar />

      <div className={Styles.container}>
        <div className={Styles.BoxContainer} style={{ padding: 0, overflow: "hidden", border: "none" }}>
          <MainCard />
        </div>

        <div className={Styles.BoxContainer} style={{background: `var(--section-bg-b)`}}>
          <Projects LimitShow={true} />
        </div>

        {hasPublications && (
          <div className={Styles.BoxContainer}>
            <Publications />
          </div>
        )}

         <div className={Styles.BoxContainer}>
          <ResearchInterests />
        </div>
        
        <div className={Styles.BoxContainer}>
          <RandomPost />
        </div>

       
      </div>
    </div>
  );
}
