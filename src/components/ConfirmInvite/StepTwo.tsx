import { useCodeStore, useZustandContext } from "@/zustand/zustandProvider";
import { useCurrentStep } from "../HomePage/ConfirmInviteSection";
import { useEffect, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
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
import * as yup from "yup";
import { values } from "lodash";

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

  interface Guest {
    name: string;
    isOldYear: boolean;
    isHost: boolean;
  }

  interface GuestFormProps {
    email: string;
    phone: string;
    codeId: string;
    guests: Guest[];
  }

  // Defina o schema de validação com Yup
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    phone: yup
      .string()
      .matches(
        /^(\+?([0-9]{2})[-. ]?)?(\(?[0-9]{2,3}\)?[-. ]?)?([0-9]{4,5})[-. ]?([0-9]{4})$/,
        "Número de telefone incorreto"
      )
      .required("O número de telefone é obrigatório"),
    codeId: yup.string().required("O código ID é obrigatório"),
  });

  // GUEST FORM GENARATE
  const guestForm = useForm<GuestFormProps>({
    initialValues: {
      email: "",
      phone: "",
      codeId: "",
      guests: [],
    },
    validate: yupResolver(validationSchema),
  });

  useEffect(() => {
    const familyData = useCodeStore.getState().family;

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
            isOldYear: true,
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
            isOldYear: noHost?.[index - 1]?.isOldYear,
          },
          index
        );
      }
    });

    guestForm.setFieldValue("codeId", currentCode?.id);
  }, [currentCode]);

  // GUEST SAVE
  const { createNewGuests } = useZustandContext();

  const handleSubmit = () => {
    guestForm.validate();
    guestForm.errors;
    createNewGuests(guestForm.values);
  };

  function isBoolean(value: boolean) {
    return typeof value === "boolean";
  }

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
                <Flex
                  gap={"1rem"}
                  justify={"start"}
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  <ActionIcon
                    color="#F5D759"
                    size={"2rem"}
                    variant="subtle"
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

                  <Text c={"#F5D759"} fw={"bold"} fz={"1.2rem"}>
                    ({currentCarousel + 1}/{currentCode.total - 1})
                  </Text>

                  <ActionIcon
                    color="#F5D759"
                    size={"2rem"}
                    variant="subtle"
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
              <Carousel
                onSlideChange={setCurrentCarousel}
                slideGap={"2rem"}
                loop
                maw={"30rem"}
                getEmblaApi={setEmbla}
                withControls={false}
              >
                {[...Array(currentCode.total - 1)].map((n, index) => {
                  return (
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
                          fz={"1rem"}
                          {...guestForm.getInputProps(
                            `guests.${index + 1}.name`
                          )}
                          label="Nome Completo"
                          placeholder="Nome Completo"
                        />
                        <Checkbox
                          color="#F5D759"
                          c={"#fff"}
                          styles={{ icon: { color: "#000" } }}
                          fz={"1rem"}
                          checked={
                            isBoolean(
                              guestForm?.values?.guests?.[index + 1]?.isOldYear
                            )
                              ? guestForm?.values?.guests?.[index + 1]
                                  ?.isOldYear
                              : true
                          }
                          {...guestForm.getInputProps(
                            `guests.${index + 1}.isOldYear`
                          )}
                          label="É maior de 8 anos ?"
                        />
                      </Flex>
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
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
              onClick={handleSubmit}
              disabled={!guestForm.isValid()}
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
