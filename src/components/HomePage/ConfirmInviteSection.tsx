"use client";
import { Center, Container, Flex } from "@mantine/core";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { useEffect } from "react";

export const ConfirmInviteSection = ({ index }: { index: number }) => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  // GET VALUES KABUKIROLL SECTIONS
  const { currentSection } = useKabukiRoll();

  // VALIDE VALUES KABUKI WITH HOME PROVIDER AND CHANGE VALUES
  useEffect(() => {
    if (currentSection === index) {
      setPrimaryColor?.("white");
      setSecondaryColor?.("#E5C74D");
    }
  }, [currentSection]);

  return (
    <Container
      fluid
      p={0}
      w={"100%"}
      h={"150vh"}
      style={{
        background: "#00000099",
        backgroundImage: "url(images/img_checkout_section.png)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <Center w={"100%"} h={"100vh"}>
        <Flex w={"1200px"} h={"100%"}></Flex>
      </Center>
    </Container>
  );
};
