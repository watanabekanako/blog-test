import "../styles/globals.css";
import type { AppProps } from "next/app";
import DefaultLayout from "../components/layout/defaultLayout";
import { RecoilRoot } from "recoil";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </RecoilRoot>
  );
}

export default MyApp;
