import "@/styles/globals.css";
import NavBar from "@/components/navbar"
import FooTer from "@/components/footer";
import { useEffect } from "react";

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
      <NavBar />
      <Component {...pageProps} />
      <FooTer/>
    </>
  );
}