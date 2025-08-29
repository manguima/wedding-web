import { Box, Button, Flex, Text } from "@mantine/core";
import { useCurrentStep } from "../HomePage/ConfirmInviteSection";
import { fontItaliana } from "@/utils/fonts";
import { useTheme } from "@/contexts/ThemeContext";

export const StepFor = ({ index }: { index: number }) => {
  const updateCurrentStep = useCurrentStep.getState().updateCurrentStep;
  const currentStep = useCurrentStep.getState().currentStep;
  
  // GET THEME DATA
  const { getWeddingData } = useTheme();
  const weddingData = getWeddingData();
  
  // FORMAT WEDDING DATE
  const getWeddingDateInfo = () => {
    if (weddingData?.weddingDate) {
      // Compensar timezone ao converter a data
      const rawDate = new Date(weddingData.weddingDate);
      const date = new Date(rawDate.getTime() + rawDate.getTimezoneOffset() * 60000);
      
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
                         'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      
      return {
        month: monthNames[date.getMonth()],
        day: date.getDate().toString().padStart(2, '0'),
        dayOfWeek: dayNames[date.getDay()],
        time: weddingData.weddingTime || '15:30',
        location: weddingData.weddingLocation || 'Sítio Geranium'
      };
    }
    
    // Fallback
    return {
      month: 'Nov',
      day: '09',
      dayOfWeek: 'Sábado',
      time: '15:30',
      location: 'Sítio Geranium'
    };
  };
  
  const dateInfo = getWeddingDateInfo();

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
{dateInfo.month}
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
{dateInfo.dayOfWeek}
          </Text>
          <Text
            lh={"8rem"}
            fz={"8rem"}
            tt={"uppercase"}
            c={"#ffde22"}
            ff={fontItaliana.style.fontFamily}
          >
{dateInfo.day}
          </Text>
          <Text
            lh={0}
            fz={"1.5rem"}
            c={"#fff"}
            ff={fontItaliana.style.fontFamily}
            style={{ position: "absolute", bottom: "1rem" }}
          >
{dateInfo.location}
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
{dateInfo.time}
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
