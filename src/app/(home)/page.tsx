"use client";
import { Container } from "@mantine/core";
import { HeaderSection } from "../../components/HomePage/HeaderSection";
import { AboutusSection } from "@/components/HomePage/AboutusSection";
import { KabukiRoll } from "@/components/KabukiRoll/KabukiRoll";
import { CountDownSection } from "@/components/HomePage/CountDownSection";
import { ConfirmInviteSection } from "@/components/HomePage/ConfirmInviteSection";
import { MusicSuggestionSection } from "@/components/HomePage/MusicSuggestionSection";
import { BuildingSection } from "@/components/HomePage/BuildingSection";
import { DefaultHeader } from "@/components/layouts/DefaultHeader";
import { DefaultFooter } from "@/components/layouts/DefaultFooter";
import { TenantGuard } from "@/components/TenantGuard";
import { ThemeLoading } from "@/components/Loading/ThemeLoading";
import { useTenant } from "@/contexts/TenantContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  return (
    <TenantGuard>
      <HomeContent />
    </TenantGuard>
  );
}

function HomeContent() {
  const { tenant } = useTenant();
  const { isLoading, isImagesLoading, showContent } = useTheme();

  // Show loading while theme data is loading or images are still loading and content not ready
  if (isLoading || (isImagesLoading && !showContent)) {
    return <ThemeLoading message={isLoading ? "Carregando tema..." : "Carregando imagens..."} />;
  }

  const pageSections = [
    ({ index }: { index: number }) => <HeaderSection index={index} />,
    ({ index }: { index: number }) => <AboutusSection index={index} />,
    ({ index }: { index: number }) => <CountDownSection index={index} />,
  ];

  // Only show RSVP section if enabled for this tenant
  if (tenant?.config?.enableRSVP) {
    pageSections.push(({ index }: { index: number }) => <ConfirmInviteSection index={index} />);
  }

  // Add music suggestion section
  pageSections.push(({ index }: { index: number }) => <MusicSuggestionSection />);

  pageSections.push(({ index }: { index: number }) => <BuildingSection index={index} />);

  return (
    <>
      <DefaultHeader />
      <Container fluid p={0} style={{ contain: "paint" }}>
        <KabukiRoll
          anchor="top"
          offset={80}
          sections={pageSections.map((Section, index) => {
            return <Section key={index} index={index} />;
          })}
        />
      </Container>
      <DefaultFooter />
    </>
  );
}
