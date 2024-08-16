import { useCodeStore, useZustandContext } from "@/zustand/zustandProvider";
import { useCurrentStep } from "../HomePage/ConfirmInviteSection";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { Button, Flex, Text, Textarea } from "@mantine/core";
import { useGuestStore } from "@/zustand/slices/guestStore";
import { Guest } from "@/zustand/types/guest.type";

export const StepThre = ({ index }: { index: number }) => {
  const { currentStep, updateCurrentStep } = useCurrentStep();

  // GUEST HOST NAME
  const {
    guests,
    saveMessage: createNewMessage,
    loading: inputLoading,
  } = useGuestStore();

  const guestName = guests?.guests
    ?.filter((guest: Partial<Guest>) => guest?.isHost)?.[0]
    .name.split(" ")[0];

  // useEffect(() => {
  //   if (!useCodeStore.getState().code) {
  //     updateCurrentStep(index - 1);
  //   }
  // }, [useCodeStore.getState().code, useCurrentStep.getState().currentStep]);

  const messageForm = useForm({
    initialValues: {
      message: "",
      familyId: "",
      id: "",
    },
  });

  useEffect(() => {
    console.log(guests);
    if (guests) {
      messageForm.reset();
      messageForm.setFieldValue(
        "familyId",
        // "ed4ec2f7-4101-472c-8cfd-3b502919b2b5"
        guests?.id
      );

      messageForm.setFieldValue("message", guests.messages?.[0]?.message);

      messageForm.setFieldValue("id", guests.messages?.[0]?.id);
    }
  }, [guests]);

  const handleSubmit = () => {
    createNewMessage(messageForm.values).then(() => {
      updateCurrentStep(currentStep + 1);
    });
  };

  return (
    index === currentStep &&
    !inputLoading && (
      <form onSubmit={messageForm.onSubmit(handleSubmit)}>
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
            <Button type="submit" c={"#000"} color="#F5D759">
              Próximo
            </Button>
          </Flex>
        </Flex>
      </form>
    )
  );
};
