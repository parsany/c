import "@/styles/globals.css";
import NavBar from "@/components/navbar"
import FooTer from "@/components/footer";
import { useEffect } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      localStorage.setItem("theme", "dark");
    }
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);

  return (
    <>
      <Head>
        <title>Parsa Ny</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
      <FooTer/>
    </>
  );
}