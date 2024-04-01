import { Box, Button, Flex, Text } from "@mantine/core";
import { useCurrentStep } from "../HomePage/ConfirmInviteSection";
import { fontItaliana } from "@/utils/fonts";

export const StepFor = ({ index }: { index: number }) => {
  const updateCurrentStep = useCurrentStep.getState().updateCurrentStep;
  const currentStep = useCurrentStep.getState().currentStep;

  return (
    <Flex w={"100%"} miw={"25rem"} direction={"column"} gap={"2rem"}>
      <Text maw={"25rem"} fz={"1.2rem"} ta={"center"} c={"#fff"}>
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
