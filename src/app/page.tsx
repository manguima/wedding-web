"use client";
import { Container } from "@mantine/core";
import { HeaderSection } from "../components/HomePage/HeaderSection";
import { AboutusSection } from "@/components/HomePage/AboutusSection";
import { KabukiRoll } from "@/components/KabukiRoll/KabukiRoll";
import { CountDownSection } from "@/components/HomePage/CountDownSection";
import { ConfirmInviteSection } from "@/components/HomePage/ConfirmInviteSection";
import { BuildingSection } from "@/components/HomePage/BuildingSection";
import { NextSeo } from "next-seo";

export default function Home() {
  const pageSections = [
    ({ index }: { index: number }) => <HeaderSection index={index} />,
    ({ index }: { index: number }) => <AboutusSection index={index} />,
    ({ index }: { index: number }) => <CountDownSection index={index} />,
    ({ index }: { index: number }) => <ConfirmInviteSection index={index} />,
    ({ index }: { index: number }) => <BuildingSection index={index} />,
  ];

  return (
    <Container fluid p={0} style={{ contain: "paint" }}>
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
