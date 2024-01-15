"use client";
import { fontHailey, fontItaliana } from "@/utils/fonts";
import { noise } from "@/utils/noise";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Text,
} from "@mantine/core";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useEffect } from "react";
import Link from "next/link";
import { menuToView } from "../layouts/DefaultHeader";
import { useScrollIntoView } from "@mantine/hooks";

export const HeaderSection = ({ index }: { index: number }) => {
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

  // MENU TO VIEW
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 0,
  });
  useEffect(() => {
    menuToView.setState({ home: { scrollIntoView } });
  }, [targetRef]);

  return (
    <Container
      ref={targetRef}
      fluid
      p={0}
      mih={"150vh"}
      h={"100%"}
      w={"100%"}
      style={{
        background: "#15241795",
        backgroundImage: "url(images/img_header_section.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <Box
        w={"100%"}
        h={"100%"}
        style={{
          opacity: 0.5,
          position: "absolute",
          top: 0,
          left: 0,
          background: `url(${noise})`,
        }}
      ></Box>
      <Center w={"100%"} h={"100vh"} style={{ position: "sticky", top: 0 }}>
        <Flex
          direction={"column"}
          gap={"3rem"}
          justify={"center"}
          align={"center"}
          top={"20vh"}
          style={{ position: "relative" }}
        >
          <Flex
            align={"center"}
            direction={"column"}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            <Text
              fz={{ base: "1rem", sm: "5rem" }}
              c={"white"}
              lh={"2rem"}
              tt={"uppercase"}
              ff={fontItaliana.style.fontFamily}
            >
              Salve
            </Text>
            <Text
              fz={"10rem"}
              c="#E5C74D"
              lh={"8rem"}
              ff={fontHailey.style.fontFamily}
            >
              esta
            </Text>
            <Text
              ff={fontItaliana.style.fontFamily}
              fz={{ base: "1rem", sm: "5rem" }}
              tt={"uppercase"}
              lh={"3rem"}
              c="white"
            >
              Data
            </Text>
          </Flex>
          <Flex
            style={{ position: "absolute", top: 0, left: "calc(100% + 2rem)" }}
          >
            <Flex direction={"column"} gap={"1rem"}>
              {dateWedding.map((item, index) => (
                <Flex
                  key={index}
                  p={"1rem"}
                  style={{
                    background: "transparent",
                    border: "0.2rem solid white",
                    borderRadius: "0.4rem",
                    position: "relative",
                  }}
                >
                  <Text lh={"1.5rem"} fz={"1.5rem"} c={"white"}>
                    {item.value}
                  </Text>
                  <Flex
                    style={{ position: "absolute", left: "calc(100% + 1rem)" }}
                  >
                    <Text c={"white"} fz={"1rem"} tt={"capitalize"}>
                      {item.label}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Button
            variant="outline"
            color="#E5C74D"
            component={Link}
            onClick={() => menuToView.getState().invite.scrollIntoView()}
            href={"#confirm"}
            style={{ zIndex: 3 }}
          >
            Confirmar Presença
          </Button>
        </Flex>
      </Center>
    </Container>
  );
};

const dateWedding = [
  { value: "09", type: "day", label: "dia" },
  { value: "11", type: "month", label: "mês" },
  { value: "24", type: "year", label: "ano" },
];
