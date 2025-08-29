import type { Metadata } from "next";
import "../styles/globals.css";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { responsive } from "@/utils/responsive";
import { ZustandProvider } from "@/zustand/zustandProvider";
import { TenantProvider } from "@/contexts/TenantContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@mantine/carousel/styles.css";

// Note: In a real multi-tenant app, metadata should be dynamic based on tenant
export const metadata: Metadata = {
  title: "Wedding Invitation",
  description: "You're invited to our special day!",
  viewport: "width=device-width, initial-scale=1",
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
        {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
        {/* <meta name="mobile-web-app-capable" content="yes" /> */}
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
        <TenantProvider>
          <ThemeProvider>
            <ZustandProvider>
              <MantineProvider theme={{ fontFamily: "Roboto, sans-serif" }}>
                {children}
              </MantineProvider>
            </ZustandProvider>
          </ThemeProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
// Hot reload test - Sun Jun 29 09:47:59 -03 2025
