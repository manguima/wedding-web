import type { Metadata } from "next";

import "@mantine/core/styles.css";
import "../styles/globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { DefaultHeader } from "@/components/layouts/DefaultHeader";
import { responsive } from "@/utils/responsive";
import { LayoutProvider } from "@/components/layouts/LayoutProvider";
import { DefaultFooter } from "@/components/layouts/DefaultFooter";
import { ZustandProvider } from "@/zustand/zustandProvider";
import "@mantine/carousel/styles.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html style={{ fontSize: responsive(5, 18) }} lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
            <LayoutProvider>
              <DefaultHeader />
              {children}
              <DefaultFooter />
            </LayoutProvider>
          </MantineProvider>
        </ZustandProvider>
      </body>
    </html>
  );
}
