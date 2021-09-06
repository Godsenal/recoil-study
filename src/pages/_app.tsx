import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import Debugger from "src/components/Debugger";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
        <Debugger />
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
