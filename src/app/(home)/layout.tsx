import { LayoutProvider } from "@/components/layouts/LayoutProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
