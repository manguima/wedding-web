"use client";
import { Box, Button, Center, Container, Flex, Text } from "@mantine/core";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { useEffect, useState } from "react";
import { useZustandContext } from "@/zustand/zustandProvider";
import { fontHailey, fontItaliana } from "@/utils/fonts";
import { IconCheck } from "@tabler/icons-react";

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

  const { validateCode } = useZustandContext();

  const [currentStep, setCurrentStep] = useState(0);

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
      <Center w={"100%"} h={"100vh"} style={{ position: "sticky", top: 0 }}>
        <Flex>
          {steps.map((step, index) => currentStep === index && step(index))}
        </Flex>
      </Center>
    </Container>
  );
};

const StepInit = (index: number) => {
  return (
    <Flex direction={"column"} gap={"2rem"} align={"center"} justify={"center"}>
      <Text
        c={"#fff"}
        fw={600}
        ta={"center"}
        lh={"4rem"}
        fz={"4rem"}
        ff={fontHailey.style.fontFamily}
        w={{ base: "100%", md: "25rem" }}
      >
        Você está
        <br /> convidado para o <br /> nosso grande dia!
      </Text>
      <Flex align={"center"} justify={"center"}>
        <Box
          style={{
            borderWidth: "0.2rem 0",
            borderStyle: "solid",
            borderColor: "#fff",
          }}
        >
          <Text fw={300} lh={"3rem"} fz={"3rem"} tt={"uppercase"} c={"#fff"}>
            Nov
          </Text>
        </Box>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          px={"1rem"}
          pb={"2rem"}
          style={{ position: "relative" }}
        >
          <Text
            lh={0}
            fz={"1.5rem"}
            tt={"uppercase"}
            c={"#fff"}
            ff={fontItaliana.style.fontFamily}
            style={{ position: "absolute", top: "1rem" }}
          >
            Sábado
          </Text>
          <Text
            lh={"8rem"}
            fz={"8rem"}
            tt={"uppercase"}
            c={"#ffde22"}
            ff={fontItaliana.style.fontFamily}
          >
            09
          </Text>
          <Text
            lh={0}
            fz={"1.5rem"}
            c={"#fff"}
            ff={fontItaliana.style.fontFamily}
            style={{ position: "absolute", bottom: "1rem" }}
          >
            Sítio Geranium
          </Text>
        </Flex>
        <Box
          style={{
            borderWidth: "0.2rem 0",
            borderStyle: "solid",
            borderColor: "#fff",
          }}
        >
          <Text fw={300} lh={"3rem"} fz={"3rem"} tt={"uppercase"} c={"#fff"}>
            15:30
          </Text>
        </Box>
      </Flex>
      <Flex>
        <Button
          leftSection={
            <Box
              pr={"0.5rem"}
              style={{ borderRight: "0.1rem solid #00000030" }}
            >
              <IconCheck />
            </Box>
          }
          c={"#000"}
          color="#F5D759"
        >
          Confirmar Presença
        </Button>
      </Flex>
    </Flex>
  );
};

const StepOne = (index: number) => {
  return (
    <Flex direction={"column"}>
      <Text>01</Text>
    </Flex>
  );
};

const StepTwo = (index: number) => {
  return (
    <Flex direction={"column"}>
      <Text>02</Text>
    </Flex>
  );
};

const StepThre = (index: number) => {
  return (
    <Flex direction={"column"}>
      <Text>03</Text>
    </Flex>
  );
};

const steps = [StepInit, StepOne, StepTwo, StepThre];
