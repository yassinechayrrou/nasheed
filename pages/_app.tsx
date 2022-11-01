import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AppLayout from "../components/AppLayout";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    initialColorMode: "dark",
    useSystemColorMode: false,
    colors: {
      gray: {
        100: "#F5f5f5",
        200: "#EEEEEE",
        300: "#E0E0E0",
        400: "#BDBDBD",
        500: "#9E9E9E",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
    },
    components: {
      Button: {
        variants: {
          link: {
            ":focus": {
              outline: "none",
              boxShadow: "none",
            },
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      {Component.isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
