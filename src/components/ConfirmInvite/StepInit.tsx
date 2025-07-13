import { useZustandContext } from "@/zustand/zustandProvider";
import { useCurrentStep } from "../HomePage/ConfirmInviteSection";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Box, Button, Flex, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { fontHailey, fontItaliana } from "@/utils/fonts";
import { useTheme } from "@/contexts/ThemeContext";

export const StepInit = ({ index }: { index: number }) => {
  const updateCurrentStep = useCurrentStep.getState().updateCurrentStep;
  const currentStep = useCurrentStep.getState().currentStep;

  const { inputLoading } = useZustandContext();
  
  // GET THEME DATA
  const { getWeddingData, getColor } = useTheme();
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
          c={getColor('confirmTextColor') as string}
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
              borderColor: getColor('borderColor') as string,
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
              c={getColor('confirmTextColor') as string}
            >
{dateInfo.month}
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
              c={getColor('confirmTextColor') as string}
              ff={fontItaliana.style.fontFamily}
              style={{ position: "absolute" }}
            >
{dateInfo.dayOfWeek}
            </Text>
            <Text
              lh={{ base: "8rem", md: "8rem" }}
              fz={{ base: "8rem", md: "8rem" }}
              tt={"uppercase"}
              c={getColor('confirmAccentColor') as string}
              ff={fontItaliana.style.fontFamily}
              style={{
                transition: "all ease 0.3s",
                transitionDelay: "0.6s",
                transform: isInView ? "translateX(0)" : "translateX(-100px)",
                opacity: isInView ? 1 : 0,
              }}
            >
{dateInfo.day}
            </Text>
            <Text
              ta={"center"}
              lh={{ base: "1.5rem", md: "1.5rem" }}
              fz={{ base: "1.5rem", md: "1.5rem" }}
              c={getColor('confirmTextColor') as string}
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
{dateInfo.location}
            </Text>
          </Flex>
          <Box
            style={{
              position: "absolute",
              left: "100%",
              borderWidth: "0.2rem 0",
              borderStyle: "solid",
              borderColor: getColor('borderColor') as string,
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
              c={getColor('confirmTextColor') as string}
            >
{dateInfo.time}
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
            c={getColor('buttonTextColor') as string}
            color={getColor('confirmButtonColor') as string}
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
