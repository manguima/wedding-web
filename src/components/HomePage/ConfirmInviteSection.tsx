"use client";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text,
  TextInput,
  Checkbox,
  Textarea,
} from "@mantine/core";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { useEffect, useRef, useState } from "react";
import { useCodeStore, useZustandContext } from "@/zustand/zustandProvider";
import { fontHailey, fontItaliana } from "@/utils/fonts";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";
import { create } from "zustand";
import { Carousel, Embla } from "@mantine/carousel";
import { useForm } from "@mantine/form";
import { menuToView } from "../layouts/DefaultHeader";
import { useScrollIntoView } from "@mantine/hooks";
import { useInView } from "framer-motion";

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
    if (currentSection === index) {
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
      h={"150dvh"}
      style={{
        background: "#00000099",
        backgroundImage: "url(images/img_checkout_section.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <Center w={"100%"} h={"100svh"} style={{ position: "sticky", top: 0 }}>
        <Flex
          w={{ base: "100%", md: "unset" }}
          p={{ base: "1rem", md: "unset" }}
          style={{ overflow: "hidden" }}
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
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: "url(gifs/loading.gif)",
        }}
      ></Flex>
    )
  );
};

const StepInit = ({ index }: { index: number }) => {
  const updateCurrentStep = useCurrentStep.getState().updateCurrentStep;
  const currentStep = useCurrentStep.getState().currentStep;

  const { inputLoading } = useZustandContext();

  // ANIMATION
  const targetRef = useRef(null);
  const isInView = useInView(targetRef);

  return (
    index === currentStep &&
    !inputLoading && (
      <Flex
        ref={targetRef}
        direction={"column"}
        gap={"2rem"}
        align={"center"}
        justify={"center"}
      >
        <Text
          c={"#fff"}
          fw={400}
          ta={"center"}
          lh={{ base: "4rem", md: "4rem" }}
          fz={{ base: "4rem", md: "4rem" }}
          ff={fontHailey.style.fontFamily}
          w={{ base: "100%", md: "25rem" }}
          style={{
            transition: "all ease 0.3s",
            transitionDelay: "0.2s",
            transform: isInView ? "translateY(0)" : "translateY(-100px)",
            opacity: isInView ? 1 : 0,
          }}
        >
          Você está
          <br /> convidado para o <br /> nosso grande dia!
        </Text>
        <Flex
          align={"center"}
          justify={"center"}
          style={{ position: "relative" }}
        >
          <Box
            style={{
              position: "absolute",
              right: "100%",
              borderWidth: "0.2rem 0",
              borderStyle: "solid",
              borderColor: "#fff",
              transition: "all ease 0.3s",
              transitionDelay: "0.2s",
              transform: isInView ? "translateX(0)" : "translateX(-100px)",
              opacity: isInView ? 1 : 0,
            }}
          >
            <Text
              fw={300}
              lh={{ base: "3rem", md: "3rem" }}
              fz={{ base: "3rem", md: "3rem" }}
              tt={"uppercase"}
              c={"#fff"}
            >
              Nov
            </Text>
          </Box>
          <Flex
            direction={"column"}
            align={"center"}
            justify={"center"}
            px={"1rem"}
            pb={"2rem"}
            style={{
              position: "relative",
              transition: "all ease 0.3s",
              transitionDelay: "0.4s",
              transform: isInView ? "translateX(0)" : "translateX(-100px)",
              opacity: isInView ? 1 : 0,
            }}
          >
            <Text
              lh={{ base: "1.5rem", md: "1.5rem" }}
              fz={{ base: "1.5rem", md: "1.5rem" }}
              top={{ base: "0", md: "1rem" }}
              c={"#fff"}
              ff={fontItaliana.style.fontFamily}
              style={{ position: "absolute" }}
            >
              Sábado
            </Text>
            <Text
              lh={{ base: "8rem", md: "8rem" }}
              fz={{ base: "8rem", md: "8rem" }}
              tt={"uppercase"}
              c={"#ffde22"}
              ff={fontItaliana.style.fontFamily}
              style={{
                transition: "all ease 0.3s",
                transitionDelay: "0.6s",
                transform: isInView ? "translateX(0)" : "translateX(-100px)",
                opacity: isInView ? 1 : 0,
              }}
            >
              09
            </Text>
            <Text
              ta={"center"}
              lh={{ base: "1.5rem", md: "1.5rem" }}
              fz={{ base: "1.5rem", md: "1.5rem" }}
              c={"#fff"}
              ff={fontItaliana.style.fontFamily}
              bottom={{ base: "0", md: "1rem" }}
              style={{
                whiteSpace: "nowrap",
                position: "absolute",
                transition: "all ease 0.3s",
                transitionDelay: "0.8s",
                transform: isInView ? "translateY(0)" : "translateY(+100px)",
                opacity: isInView ? 1 : 0,
              }}
            >
              Sítio Geranium
            </Text>
          </Flex>
          <Box
            style={{
              position: "absolute",
              left: "100%",
              borderWidth: "0.2rem 0",
              borderStyle: "solid",
              borderColor: "#fff",
              transition: "all ease 0.3s",
              transitionDelay: "1s",
              transform: isInView ? "translateX(0)" : "translateX(-100px)",
              opacity: isInView ? 1 : 0,
            }}
          >
            <Text
              fw={300}
              lh={{ base: "3rem", md: "3rem" }}
              fz={{ base: "3rem", md: "3rem" }}
              tt={"uppercase"}
              c={"#fff"}
            >
              15:30
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Button
            style={{
              transition: "all ease 0.3s",
              transitionDelay: "1.2s",
              opacity: isInView ? 1 : 0,
            }}
            leftSection={
              <Box
                pr={"0.5rem"}
                style={{ borderRight: "0.1rem solid #00000030" }}
              >
                <IconCheck />
              </Box>
            }
            mt={{ base: "4rem", md: 0 }}
            c={"#000"}
            color="#F5D759"
            onClick={() => {
              updateCurrentStep(index + 1);
            }}
          >
            Confirmar Presença
          </Button>
        </Flex>
      </Flex>
    )
  );
};

const StepOne = ({ index }: { index: number }) => {
  const updateCurrentStep = useCurrentStep.getState().updateCurrentStep;
  const currentStep = useCurrentStep.getState().currentStep;

  const { validateCode } = useZustandContext();

  const onError = useCodeStore.getState().error;

  const [inputCode, setInputCode] = useState("");

  const { inputLoading } = useZustandContext();

  return (
    index === currentStep &&
    !inputLoading && (
      <Flex w={"100%"} direction={"column"} p={{ base: "2rem", md: 0 }}>
        <Flex
          w={{ base: "100%", md: "25rem" }}
          direction={"column"}
          gap={{ base: "1rem", md: "1rem" }}
        >
          {/* DESKTOP */}
          <TextInput
            styles={{
              input: {
                background: "transparent",
                color: "#fff",
                textTransform: "uppercase",
              },
              label: { color: "#fff" },
            }}
            size="lg"
            value={inputCode.toUpperCase()}
            onChange={(e) => setInputCode(e.currentTarget.value.toUpperCase())}
            label="Código do convite"
            error={onError?.section === index ? onError?.message : ""}
          />
          <Flex w={"100%"} justify={"space-between"}>
            <Button
              onClick={() => {
                updateCurrentStep(0);
              }}
              c={"#fff"}
              variant="transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                validateCode(inputCode.toUpperCase());
              }}
              c={"#000"}
              color="#F5D759"
            >
              Próximo
            </Button>
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

const StepTwo = ({ index }: { index: number }) => {
  const updateCurrentStep = useCurrentStep.getState().updateCurrentStep;
  const currentStep = useCurrentStep.getState().currentStep;

  const { inputLoading } = useZustandContext();

  const [embla, setEmbla] = useState<Embla | null>(null);
  const [currentCarousel, setCurrentCarousel] = useState(0);

  const currentCode = useCodeStore.getState().code;

  useEffect(() => {
    if (!currentCode) updateCurrentStep(1);
  }, [currentStep]);

  type GuestFormProps = {
    email: string;
    phone: string;
    codeId: string;
    guests?: { name: string; isOldYear: boolean; isHost: boolean }[];
  };

  // GUEST FORM GENARATE
  const guestForm = useForm<GuestFormProps>({
    initialValues: {
      email: "",
      phone: "",
      codeId: "",
      guests: [],
    },
    validate: {
      phone: (value) =>
        /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(value)
          ? null
          : "Número de telefone incorreto",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),

      // guests: () => (value < 18 ? 'You must be at least 18 to register' : null),
    },
  });

  useEffect(() => {
    guestForm.reset();
    [...Array(currentCode?.total)].map((n, index) => {
      guestForm.insertListItem(
        `guests`,
        {
          name: "",
          isHost: index > 0 ? false : true,
          isOldYear: index > 0 ? false : true,
        },
        index
      );
    });

    guestForm.setFieldValue("codeId", currentCode?.id);
  }, [currentCode]);

  useEffect(() => {
    console.log(guestForm.values);
  }, [guestForm.values.guests?.[0]]);

  // GUEST SAVE
  const { createNewGuests } = useZustandContext();

  return (
    index === currentStep &&
    !inputLoading && (
      <Flex direction={"column"} p={{ base: "2rem", md: 0 }} miw={"25rem"}>
        <Flex w={"100%"} direction={"column"} gap={"1rem"}>
          <Text fw={700} fz={{ base: "1.4rem", md: "1.4rem" }} c={"#fff"}>
            Cadastro de convidado
          </Text>
          {/* DESKTOP */}
          <TextInput
            required
            styles={{
              input: { background: "transparent", color: "#fff" },
              label: { color: "#fff" },
            }}
            {...guestForm.getInputProps(`guests.0.name`)}
            onChange={(e) => {
              guestForm.setFieldValue("guests.0.name", e.currentTarget.value);
            }}
            label="Nome Completo"
            placeholder="Nome Completo"
          />
          <TextInput
            required
            styles={{
              input: { background: "transparent", color: "#fff" },
              label: { color: "#fff" },
            }}
            {...guestForm.getInputProps(`email`)}
            label="E-mail"
            placeholder="E-mail para receber avisos"
          />
          <TextInput
            required
            styles={{
              input: { background: "transparent", color: "#fff" },
              label: { color: "#fff" },
            }}
            {...guestForm.getInputProps(`phone`)}
            label="Telefone"
            placeholder="Telefone (whatsapp)"
          />
          {currentCode.total > 1 && (
            <Flex
              w={"100%"}
              direction={"column"}
              gap={"1rem"}
              justify={"center"}
              mt={"1rem"}
              style={{
                position: "relative",
              }}
            >
              <Flex justify={"space-between"}>
                <Text c={"#fff"} fz={"1rem"}>
                  Quem estará com você?
                </Text>
                <Text c={"#F5D759"} fw={"bold"} fz={"1.2rem"}>
                  ({currentCarousel + 1}/{currentCode.total - 1})
                </Text>
              </Flex>
              <Carousel
                onSlideChange={setCurrentCarousel}
                slideGap={"2rem"}
                w={"100%"}
                nextControlIcon={
                  <ActionIcon style={{ position: "absolute", right: "-2rem" }}>
                    <IconArrowRight />
                  </ActionIcon>
                }
                getEmblaApi={setEmbla}
                styles={{ control: { marginRight: "3rem" } }}
                withControls={false}
              >
                {[...Array(currentCode.total - 1)].map((n, index) => (
                  <Carousel.Slide key={index}>
                    <Flex direction={"column"} gap={"1rem"}>
                      <Text fw={700} fz={"1.4rem"} c={"#fff"}>
                        Convidado {index + 1}
                      </Text>
                      <TextInput
                        styles={{
                          input: { background: "transparent", color: "#fff" },
                          label: { color: "#fff" },
                        }}
                        required
                        fz={"1rem"}
                        {...guestForm.getInputProps(`guests.${index + 1}.name`)}
                        label="Nome Completo"
                        placeholder="Nome Completo"
                      />
                      <Checkbox
                        color="#F5D759"
                        c={"#fff"}
                        styles={{ icon: { color: "#000" } }}
                        fz={"1rem"}
                        {...guestForm.getInputProps(
                          `guests.${index + 1}.isOldYear`
                        )}
                        label="É maior de 8 anos ?"
                      />
                    </Flex>
                  </Carousel.Slide>
                ))}
              </Carousel>

              {/* ARROWS CAROUSEL */}
              <Flex
                w={"100%"}
                justify={"space-between"}
                style={{
                  position: "absolute",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                <ActionIcon
                  color="#000"
                  size={"4rem"}
                  ml={"-5rem"}
                  style={{
                    pointerEvents: "all",
                    userSelect: "all",
                    boder: "1px solid #ffffff80",
                  }}
                  onClick={() => {
                    embla?.scrollPrev();
                  }}
                >
                  <IconArrowLeft />
                </ActionIcon>

                <ActionIcon
                  color="#000"
                  size={"4rem"}
                  mr={"-5rem"}
                  style={{
                    pointerEvents: "all",
                    userSelect: "all",
                    boder: "1px solid #ffffff80",
                  }}
                  onClick={() => {
                    embla?.scrollNext();
                  }}
                >
                  <IconArrowRight />
                </ActionIcon>
              </Flex>
            </Flex>
          )}
          <Flex w={"100%"} justify={"space-between"}>
            <Button
              onClick={() => {
                updateCurrentStep(0);
              }}
              c={"#fff"}
              variant="transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                createNewGuests(guestForm.values);
              }}
              // disabled={guestForm.isValid() ? true : false}
              c={"#000"}
              color="#F5D759"
            >
              Próximo
            </Button>
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

const StepThre = ({ index }: { index: number }) => {
  const updateCurrentStep = useCurrentStep.getState().updateCurrentStep;
  const currentStep = useCurrentStep.getState().currentStep;

  // GUEST HOST NAME
  const guestName = useCodeStore
    .getState()
    .family?.guests[0]?.name.split(" ")[0];

  const { inputLoading, createNewMessage } = useZustandContext();

  // useEffect(() => {
  //   if (!useCodeStore.getState().code) {
  //     updateCurrentStep(index - 1);
  //   }
  // }, [useCodeStore.getState().code, useCurrentStep.getState().currentStep]);

  const messageForm = useForm({
    initialValues: {
      message: "",
      familyId: "",
    },
  });

  useEffect(() => {
    messageForm.reset();
    messageForm.setFieldValue(
      "familyId",
      // "ed4ec2f7-4101-472c-8cfd-3b502919b2b5"
      useCodeStore.getState().family?.id
    );
  }, []);

  return (
    index === currentStep &&
    !inputLoading && (
      <Flex
        w={"100%"}
        miw={"25rem"}
        direction={"column"}
        gap={"1rem"}
        p={{ base: "2rem", md: 0 }}
      >
        <Text c={"#fff"} fz={"1.4rem"}>
          Olá {guestName}! Deseja deixar uma mensagem para os noivos?
        </Text>
        <Textarea
          styles={{
            input: { background: "transparent", color: "#fff" },
            label: { color: "#fff" },
          }}
          rows={6}
          fz={"1rem"}
          {...messageForm.getInputProps(`message`)}
          label="Mensagem"
          placeholder=""
        />
        <Flex w={"100%"} justify={"space-between"}>
          {/* <Button
            onClick={() => {
              updateCurrentStep(index - 1);
            }}
            c={"#fff"}
            variant="transparent"
          >
            Voltar
          </Button> */}
          <Button
            onClick={() => {
              createNewMessage(messageForm.values);
            }}
            c={"#000"}
            color="#F5D759"
          >
            Próximo
          </Button>
        </Flex>
      </Flex>
    )
  );
};

const StepFor = ({ index }: { index: number }) => {
  const updateCurrentStep = useCurrentStep.getState().updateCurrentStep;
  const currentStep = useCurrentStep.getState().currentStep;

  return (
    <Flex w={"100%"} miw={"25rem"} direction={"column"} gap={"2rem"}>
      <Text fz={"1.2rem"} ta={"center"} c={"#fff"}>
        Ficamos felizes em saber que você estará conosco nesse dia tão especial.
        Não vemos a hora de compartilhar a alegria do nosso casamento com você!
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
      <Flex w={"100%"} justify={"space-between"}>
        <Button
          onClick={() => {
            updateCurrentStep(0);
          }}
          c={"#000"}
          color="#ffde22"
          variant="filled"
        >
          Voltar
        </Button>
      </Flex>
    </Flex>
  );
};

const steps = [StepInit, StepOne, StepTwo, StepThre, StepFor];
