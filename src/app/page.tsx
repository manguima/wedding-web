import { Container, Flex } from "@mantine/core";
import { Metadata } from "next";
import { HeaderSection } from "../components/HomePage/HeaderSection";
import { AboutusSection } from "@/components/HomePage/AboutusSection";
import { KabukiRoll } from "@/components/KabukiRoll/KabukiRoll";

export const metadata: Metadata = {
  title: "Home - Deyse & Matheus",
  description: "Site do casamento.",
};

export default function Home() {
  const pageSections = [
    ({ index }: { index: number }) => <HeaderSection index={index} />,
    ({ index }: { index: number }) => <AboutusSection index={index} />,
  ];

  return (
    <Container fluid p={0}>
      <KabukiRoll
        anchor="top"
        offset={80}
        sections={pageSections.map((Section, index) => {
          return <Section key={index} index={index} />;
        })}
      />
    </Container>
  );
}
