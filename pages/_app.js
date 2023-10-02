import '@/styles/globals.css'
import { CategoriesProvider } from '@/components/categoriesProvider';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  
  return (
    <SessionProvider session={pageProps.session}>
    <CategoriesProvider>
      <Component {...pageProps} />
    </CategoriesProvider>
    </SessionProvider>
  );
}

export default MyApp;