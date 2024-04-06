"use client";
import { Box, Center, Container, Flex, Image, Paper } from "@mantine/core";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { useEffect } from "react";
import { useZustandContext } from "@/zustand/zustandProvider";
import { create } from "zustand";
import { menuToView } from "../layouts/DefaultHeader";
import { useScrollIntoView } from "@mantine/hooks";
import { StepOne } from "../ConfirmInvite/StepOne";
import { StepInit } from "../ConfirmInvite/StepInit";
import { StepTwo } from "../ConfirmInvite/StepTwo";
import { StepFor } from "../ConfirmInvite/StepFor";
import { StepThre } from "../ConfirmInvite/StepThre";

type currentStepState = {
  currentStep: number;
};

type currentStepAction = {
  updateCurrentStep: (data: currentStepState["currentStep"]) => void;
};

export const useCurrentStep = create<currentStepState & currentStepAction>(
  (set) => ({
    currentStep: 0,
    updateCurrentStep: (data) =>
      set(() => ({
        currentStep: data,
      })),
  })
);

export const ConfirmInviteSection = ({ index }: { index: number }) => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  // GET VALUES KABUKIROLL SECTIONS
  const { currentSection } = useKabukiRoll();

  // MENU TO VIEW
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: -10,
  });
  useEffect(() => {
    menuToView.setState({ invite: { scrollIntoView } });
  }, [targetRef]);

  // VALIDE VALUES KABUKI WITH HOME PROVIDER AND CHANGE VALUES
  useEffect(() => {
    if (currentSection === index + 1) {
      setPrimaryColor?.("white");
      setSecondaryColor?.("#E5C74D");
    }
  }, [currentSection]);

  const currentStep = useCurrentStep((state) => state.currentStep);

  const { inputLoading } = useZustandContext();

  return (
    <Container
      ref={targetRef}
      fluid
      p={0}
      w={"100%"}
      h={"150vh"}
      style={{
        position: "relative",
      }}
    >
      <Center w={"100%"} h={"100dvh"} style={{ position: "sticky", top: 0 }}>
        <Paper
          style={{ position: "absolute", zIndex: 0, top: 0 }}
          w={"100%"}
          h={"100%"}
        >
          <Image
            style={{ filter: "brightness(50%)" }}
            height={"100%"}
            fit="cover"
            src={"images/img_checkout_section.png"}
          />
        </Paper>
        <Flex
          w={{ base: "100%", md: "unset" }}
          p={{ base: "1rem", md: "unset" }}
          style={{ zIndex: 3 }}
        >
          <Box
            w={{ base: "100%", md: "unset" }}
            p={{ base: "1rem" }}
            style={{
              borderRadius: "0.5rem",
              transition: "all ease 0.4s",
              background:
                currentStep !== 0 && !inputLoading
                  ? "#00000099"
                  : "transparent",
            }}
          >
            <StepLoading />
            {steps.map(
              (Step, index) =>
                index === currentStep && <Step key={index} index={index} />
            )}
          </Box>
        </Flex>
      </Center>
    </Container>
  );
};

const StepLoading = () => {
  const { inputLoading } = useZustandContext();

  return (
    inputLoading && (
      <Flex
        w={"30rem"}
        h={"30rem"}
        style={{
          contain: "paint",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: "url(gifs/loading.gif)",
        }}
      ></Flex>
    )
  );
};

const steps = [StepInit, StepOne, StepTwo, StepThre, StepFor];
