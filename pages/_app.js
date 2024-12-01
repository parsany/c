import "@/styles/globals.css";
import NavBar from "@/components/navbar"
import FooTer from "@/components/footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <FooTer/>
    </>
  );
}
