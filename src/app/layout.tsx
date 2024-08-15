import type { Metadata } from "next";
import "../styles/globals.css";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { DefaultHeader } from "@/components/layouts/DefaultHeader";
import { responsive } from "@/utils/responsive";
import { LayoutProvider } from "@/components/layouts/LayoutProvider";
import { DefaultFooter } from "@/components/layouts/DefaultFooter";
import { ZustandProvider } from "@/zustand/zustandProvider";
import "@mantine/carousel/styles.css";

export const metadata: Metadata = {
  title: "Deyse & Matheus - Casamento",
  description: "Você está convidado para o nosso grande dia!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html style={{ fontSize: responsive(5, 18) }} lang="en">
      {/* <html lang="en"> */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          property="og:image:url"
          content="https://deimatch.com.br/backgroundUrl.jpg"
        />
        <meta property="og:title" content="Deyse & Matheus" />
        <meta
          property="og:description"
          content="Você está convidado para o nosso grande dia!"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:type" content="website" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <ColorSchemeScript />
      </head>
      <body>
        <ZustandProvider>
          <MantineProvider theme={{ fontFamily: "Roboto, sans-serif" }}>
            <LayoutProvider>{children}</LayoutProvider>
          </MantineProvider>
        </ZustandProvider>
      </body>
    </html>
  );
}
