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
  Image,
  Text,
} from "@mantine/core";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { menuToView } from "../layouts/DefaultHeader";
import { useScrollIntoView } from "@mantine/hooks";
import { useInView } from "framer-motion";

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

  // ANIMATION
  const isInView = useInView(targetRef);

  return (
    <Container
      ref={targetRef}
      fluid
      p={0}
      mih={"150dvh"}
      h={"100%"}
      w={"100%"}
      style={{
        background: "#15241795",
        backgroundImage: "url(images/img_header_section.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
        position: "relative",
        contain: "paint",
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

      <Box
        w={{ base: "18rem", md: "25rem" }}
        h={{ base: "18rem", md: "25rem" }}
        top={{ base: "85vh", md: "70vh" }}
        style={{
          position: "absolute",
          left: "-4vw",
          transition: "all ease 0.4s",
          opacity: isInView ? 1 : 0,
          transform: isInView
            ? "translateX(0) translateY(0) rotate(0deg) scaleX(-1)"
            : "translateX(-100px) translateY(-200px) rotate(-40deg) scaleX(-1)",
        }}
      >
        <Image src={"images/tree1.png"} />
      </Box>

      <Center w={"100%"} h={"100svh"} style={{ position: "sticky", top: 0 }}>
        <Flex
          direction={"column"}
          gap={"3rem"}
          justify={"center"}
          align={"center"}
          opacity={isInView ? 1 : 0}
          top={isInView ? "20vh" : "0vh"}
          style={{
            position: "relative",
            transition: "all ease 1.2s",
          }}
        >
          <Flex
            align={"center"}
            direction={"column"}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            <Text
              fz={{ base: "5rem", md: "5rem" }}
              c={"white"}
              lh={{ base: "2rem", md: "2rem" }}
              tt={"uppercase"}
              ff={fontItaliana.style.fontFamily}
            >
              Salve
            </Text>
            <Text
              fz={{ base: "7rem", md: "10rem" }}
              c="#E5C74D"
              lh={{ base: "8rem", md: "8rem" }}
              ff={fontHailey.style.fontFamily}
            >
              esta
            </Text>
            <Text
              ff={fontItaliana.style.fontFamily}
              fz={{ base: "5rem", md: "5rem" }}
              tt={"uppercase"}
              lh={{ base: "2rem", md: "3rem" }}
              c="white"
            >
              Data
            </Text>
          </Flex>
          <Flex
            style={{
              position: "absolute",
              top: 0,
              left: "calc(100% + 2rem)",
            }}
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
                  <Text
                    lh={{ base: "1rem", md: "1.5rem" }}
                    fz={{ base: "1rem", md: "1.5rem" }}
                    c={"white"}
                  >
                    {item.value}
                  </Text>
                  <Flex
                    style={{
                      position: "absolute",
                      left: "calc(100% + 1rem)",
                    }}
                  >
                    <Text
                      c={"white"}
                      fz={{ base: "1rem", md: "1rem" }}
                      tt={"capitalize"}
                    >
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

      <Box
        w={"25rem"}
        h={"25rem"}
        style={{
          position: "absolute",
          top: "-20%",
          right: "-7vw",
          transition: "all ease 0.6s",
          opacity: isInView ? 1 : 0,
          transform: isInView
            ? "translateX(0) translateY(0) rotate(0deg) scaleY(-1)"
            : "translateX(100px) translateY(200px) rotate(40deg) scaleY(-1)",
        }}
      >
        <Image src={"images/tree1.png"} />
      </Box>
    </Container>
  );
};

const dateWedding = [
  { value: "09", type: "day", label: "dia" },
  { value: "11", type: "month", label: "mês" },
  { value: "24", type: "year", label: "ano" },
];
