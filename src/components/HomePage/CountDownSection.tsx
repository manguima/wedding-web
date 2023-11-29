"use client";
import { Center, Container, Divider, Flex } from "@mantine/core";
import { useEffect } from "react";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { noise } from "@/utils/noise";

export const CountDownSection = ({ index }: { index: number }) => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  // GET VALUES KABUKIROLL SECTIONS
  const { currentSection } = useKabukiRoll();

  // VALIDE VALUES KABUKI WITH HOME PROVIDER AND CHANGE VALUES
  useEffect(() => {
    if (currentSection === index) {
      setPrimaryColor?.("black");
      setSecondaryColor?.("white");
    }
  }, [currentSection]);

  return (
    <Container
      fluid
      p={0}
      w={"100%"}
      style={{ background: `url(${noise})`, backgroundColor: "#E1F0D2" }}
      mih={"150vh"}
      h={"100%"}
    >
      <Center w={"100%"} h={"100vh"} style={{ position: "sticky" }}>
        <Flex direction={"column"}>
          <Divider label="Contagem" />
        </Flex>
      </Center>
    </Container>
  );
};
