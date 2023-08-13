import '@/styles/globals.css';
import { MyContextProvider } from '@/context/Mycontext';
export default function App({ Component, pageProps }) {
  return (
    <MyContextProvider>
      <Component {...pageProps} />
    </MyContextProvider>
  );
}
