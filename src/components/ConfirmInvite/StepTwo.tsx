import { useCodeStore, useZustandContext } from "@/zustand/zustandProvider";
import { useCurrentStep } from "../HomePage/ConfirmInviteSection";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  ActionIcon,
  Button,
  Checkbox,
  Flex,
  Text,
  TextInput,
} from "@mantine/core";
import { Carousel, Embla } from "@mantine/carousel";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export const StepTwo = ({ index }: { index: number }) => {
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
    let familyData = useCodeStore.getState().family;

    guestForm.reset();
    guestForm.setFieldValue("email", familyData?.email);
    guestForm.setFieldValue("phone", familyData?.phone);
    [...Array(currentCode?.total)].map((n, index) => {
      if (index === 0) {
        const host = familyData?.guests?.filter((val: any) => val?.isHost);
        guestForm.insertListItem(
          `guests`,
          {
            id: host?.[index]?.id || "",
            name: host?.[index]?.name || "",
            isHost: index > 0 ? false : true,
            isOldYear: host?.[index]?.isOldYear || true,
          },
          index
        );
      } else {
        const noHost = familyData?.guests?.filter((val: any) => !val?.isHost);
        guestForm.insertListItem(
          `guests`,
          {
            id: noHost?.[index - 1]?.id || "",
            name: noHost?.[index - 1]?.name || "",
            isHost:
              Boolean(noHost?.[index - 1]?.isHost) || index > 0 ? false : true,
            isOldYear: noHost?.[index - 1]?.isOldYear || true,
          },
          index
        );
      }
    });

    guestForm.setFieldValue("codeId", currentCode?.id);
  }, [currentCode]);

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
                        defaultChecked
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
                // console.log(guestForm.values);
                createNewGuests(guestForm.values);
              }}
              disabled={guestForm.isValid() || false}
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
