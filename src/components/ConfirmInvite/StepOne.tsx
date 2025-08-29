import { useCodeStore, useZustandContext } from "@/zustand/zustandProvider";
import { useCurrentStep } from "../HomePage/ConfirmInviteSection";
import { useState } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { useGuestStore } from "@/zustand/slices/guestStore";

export const StepOne = ({ index }: { index: number }) => {
  const { currentStep, updateCurrentStep } = useCurrentStep();

  const [onError, setOnError] = useState<string>();

  const { validateCode } = useGuestStore();

  const handleSubmit = () => {
    validateCode(inputCode.toUpperCase())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        }
        updateCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        setOnError(err?.message);
      });
  };

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
              description: {
                color: "#ffffff99",
              },
            }}
            size="lg"
            value={inputCode.toUpperCase()}
            onChange={(e) => setInputCode(e.currentTarget.value.toUpperCase())}
            label="Código do convite"
            description="Depois de confirmado o convite ainda é possível voltar e editá-lo usando o mesmo código."
            error={onError || ""}
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
            <Button onClick={handleSubmit} c={"#000"} color="#F5D759">
              Próximo
            </Button>
          </Flex>
        </Flex>
      </Flex>
    )
  );
};
