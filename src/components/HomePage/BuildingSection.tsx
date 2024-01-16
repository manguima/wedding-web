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
import { useEffect, useRef } from "react";
import { fontHailey } from "@/utils/fonts";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { useInView } from "framer-motion";

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

  // ANIMATION
  const targetRef = useRef(null);
  const isInView = useInView(targetRef);

  return (
    <Container
      ref={targetRef}
      fluid
      w={"100%"}
      h={"150dvh"}
      style={{
        backgroundImage: "url(./images/img_building_section.png)",
        backgroundSize: "100%",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Center w={"100%"} h={"100svh"} style={{ position: "sticky", top: 0 }}>
        <Flex direction={"column"} justify={"center"} align={"center"}>
          <Title
            fw={500}
            fz={"6rem"}
            lh={"5rem"}
            ta={"center"}
            ff={fontHailey?.style?.fontFamily}
            style={{
              transition: "all ease 0.3s",
              transitionDelay: "0.7s",
              transform: isInView ? "translateY(0)" : "translateY(+100px)",
              opacity: isInView ? 1 : 0,
            }}
          >
            Ainda tem muito mais!
          </Title>
          <Text
            style={{
              transition: "all ease 0.3s",
              transitionDelay: "1s",
              transform: isInView ? "translateY(0)" : "translateY(+100px)",
              opacity: isInView ? 1 : 0,
            }}
            fz={"1rem"}
          >
            Aguarde para novas atualizações.
          </Text>
        </Flex>
      </Center>
    </Container>
  );
};
