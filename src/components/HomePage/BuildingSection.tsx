"use client";
import {
  ActionIcon,
  Center,
  Container,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useEffect } from "react";
import { fontHailey } from "@/utils/fonts";
import { IconBrandLinkedin } from "@tabler/icons-react";

export const BuildingSection = ({ index }: { index: number }) => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  // GET VALUES KABUKIROLL SECTIONS
  const { currentSection } = useKabukiRoll();

  // VALIDE VALUES KABUKI WITH HOME PROVIDER AND CHANGE VALUES
  useEffect(() => {
    if (currentSection === index) {
      setPrimaryColor?.("black");
      setSecondaryColor?.("#E5C74D");
    }
  }, [currentSection]);

  return (
    <Container
      fluid
      w={"100%"}
      h={"150vh"}
      style={{
        backgroundImage: "url(./images/img_building_section.png)",
        backgroundSize: "contain",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Center w={"100%"} h={"100vh"} style={{ position: "sticky", top: 0 }}>
        <Flex direction={"column"} justify={"center"} align={"center"}>
          <Title
            fw={500}
            fz={"6rem"}
            lh={"5rem"}
            ff={fontHailey?.style?.fontFamily}
          >
            Ainda tem muito mais!
          </Title>
          <Text fz={"1rem"}>Aguarde para novas atualizações.</Text>
        </Flex>
      </Center>
    </Container>
  );
};
