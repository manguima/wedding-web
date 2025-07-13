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
  Paper,
  Portal,
  Text,
} from "@mantine/core";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { menuToView } from "../layouts/DefaultHeader";
import { useScrollIntoView } from "@mantine/hooks";
import { useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useTenant } from "@/contexts/TenantContext";

export const HeaderSection = ({ index }: { index: number }) => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  // GET VALUES KABUKIROLL SECTIONS
  const { currentSection } = useKabukiRoll();

  // GET THEME DATA
  const { getAsset, getContent, getWeddingData, getColor } = useTheme();
  const { tenant } = useTenant();

  // GET WEDDING DATA
  const weddingData = getWeddingData();

  // GENERATE DATE ARRAY FROM WEDDING DATA
  const getDateWedding = () => {
    if (!weddingData?.weddingDate) {
      return [
        { value: "09", type: "day", label: "dia" },
        { value: "11", type: "month", label: "mês" },
        { value: "24", type: "year", label: "ano" },
      ];
    }

    // Compensar timezone ao converter a data
    const rawDate = new Date(weddingData.weddingDate);
    const date = new Date(
      rawDate.getTime() + rawDate.getTimezoneOffset() * 60000
    );

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return [
      { value: day, type: "day", label: "dia" },
      { value: month, type: "month", label: "mês" },
      { value: year, type: "year", label: "ano" },
    ];
  };

  const dateWedding = getDateWedding();

  // VALIDE VALUES KABUKI WITH HOME PROVIDER AND CHANGE VALUES
  useEffect(() => {
    if (currentSection === index + 1) {
      setPrimaryColor?.(getColor('headerTextColor') as string);
      setSecondaryColor?.(getColor('headerAccentColor') as string);
    }
  }, [currentSection, getColor]);

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
      mih={"150svh"}
      h={"100%"}
      w={"100%"}
      style={{
        position: "relative",
        contain: "paint",
      }}
      bgp={"center"}
      bga={"fixed"}
      bgr={"no-repeat"}
      bgsz={{ base: "auto 100vh", md: "100% auto" }}
    >
      <Flex
        style={{ position: "fixed", top: 0, left: 0 }}
        w={"100%"}
        h={"100%"}
      >
        <Paper style={{ position: "sticky", top: 0 }} w={"100%"} h={"100vh"}>
          <Image
            style={{ zIndex: 2, filter: `brightness(${getColor('headerFilterBrightness')}%)` }}
            height={"100%"}
            fit="cover"
            src={getAsset("header_background")}
          />
        </Paper>
      </Flex>

      <Portal>
        <Box
          w={{ base: "18rem", md: "25rem" }}
          h={{ base: "18rem", md: "25rem" }}
          top={{ base: "135svh", md: "70vh" }}
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
          <Image src={getAsset("tree1")} />
        </Box>
      </Portal>

      <Center w={"100%"} h={"100svh"} style={{ position: "sticky", top: 0 }}>
        <Flex
          direction={"column"}
          gap={"3rem"}
          justify={"center"}
          align={"center"}
          opacity={isInView ? 1 : 0}
          top={{
            base: isInView ? "10vh" : "0vh",
            md: isInView ? "20vh" : "0vh",
          }}
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
              c={getColor('headerTextColor') as string}
              lh={{ base: "2rem", md: "2rem" }}
              tt={"uppercase"}
              ff={fontItaliana.style.fontFamily}
            >
              Salve
            </Text>
            <Text
              fz={{ base: "7rem", md: "10rem" }}
              c={getColor('headerAccentColor') as string}
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
              c={getColor('headerTextColor') as string}
            >
              data
            </Text>
          </Flex>
          <Flex
            top={{ base: 0, md: 0 }}
            left={{ base: "0", md: "calc(100% + 2rem)" }}
            pos={{ base: "unset", md: "absolute" }}
          >
            <Flex direction={{ base: "row", md: "column" }} gap={"1rem"}>
              {dateWedding.map((item, index) => (
                <Flex
                  key={index}
                  p={"1rem"}
                  style={{
                    background: "transparent",
                    border: `0.2rem solid ${getColor('borderColor')}`,
                    borderRadius: "0.4rem",
                    position: "relative",
                  }}
                >
                  <Text
                    lh={{ base: "1rem", md: "1.5rem" }}
                    fz={{ base: "1rem", md: "1.5rem" }}
                    c={getColor('headerTextColor') as string}
                  >
                    {item.value}
                  </Text>
                  <Flex
                    w={"100%"}
                    h={{ md: "100%", xs: "auto" }}
                    style={{ alignItems: "center" }}
                    top={{ base: "calc(100% + 0.5rem)", md: 0 }}
                    left={{ base: "0", md: "calc(100% + 1rem)" }}
                    pos={{ base: "absolute" }}
                  >
                    <Text
                      w={{ base: "100%", md: "unset" }}
                      ta={"center"}
                      c={getColor('headerTextColor') as string}
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
            color={getColor('headerAccentColor') as string}
            // component={Link}
            onClick={() => menuToView.getState().invite.scrollIntoView()}
            // href={"#confirm"}
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
        <Image src={getAsset("tree1")} />
      </Box>
    </Container>
  );
};
