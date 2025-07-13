"use client";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useRef } from "react";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { noise } from "@/utils/noise";
import { fontItaliana } from "@/utils/fonts";
import { useInView } from "framer-motion";
import { useSetState } from "@mantine/hooks";
import { useTheme } from "@/contexts/ThemeContext";

export const CountDownSection = ({ index }: { index: number }) => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  // GET VALUES KABUKIROLL SECTIONS
  const { currentSection } = useKabukiRoll();

  // GET THEME DATA
  const { getWeddingData, getContent, getColor } = useTheme();
  const weddingData = getWeddingData();

  // VALIDE VALUES KABUKI WITH HOME PROVIDER AND CHANGE VALUES
  useEffect(() => {
    if (currentSection === index + 1) {
      setPrimaryColor?.(getColor('countdownTextColor') as string);
      setSecondaryColor?.(getColor('borderColor') as string);
    }
  }, [currentSection, getColor]);

  // ANIMATION
  const targetRef = useRef(null);
  const isInView = useInView(targetRef);

  // COUNTDOWN TIMER - USE WEDDING DATA
  const getCountDownDate = () => {

    if (weddingData?.weddingDate && weddingData?.weddingTime) {
      try {
        // Compensar timezone ao converter a data
        const rawDate = new Date(weddingData.weddingDate);
        const date = new Date(
          rawDate.getTime() + rawDate.getTimezoneOffset() * 60000
        );


        // Verificar se a data base é válida
        if (isNaN(date.getTime())) {
          console.warn("Invalid base date, using fallback");
          return new Date("2024-11-09T15:30:00").getTime();
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        // Criar string no formato ISO que é mais confiável
        const dateString = `${year}-${month}-${day}T${weddingData.weddingTime}:00`;
        const targetDate = new Date(dateString);


        // Verificar se a data é válida
        if (isNaN(targetDate.getTime())) {
          console.warn(
            "Invalid wedding date, using fallback. Date string was:",
            dateString
          );
          return new Date("2024-11-09T15:30:00").getTime();
        }

        return targetDate.getTime();
      } catch (error) {
        console.warn("Error parsing wedding date:", error);
        return new Date("2024-11-09T15:30:00").getTime();
      }
    }
    // Fallback para data padrão
    return new Date("2024-11-09T15:30:00").getTime();
  };

  const countDownDate = getCountDownDate();

  const [dateTimeNow, changeDateTimeNow] = useSetState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const hasPassed = countDownDate - new Date().getTime() < 0;

  useEffect(() => {
    // Se countDownDate for inválido, não executar o countdown
    if (!countDownDate || isNaN(countDownDate)) {
      console.warn("Invalid countDownDate:", countDownDate);
      return;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        // Se já passou, zerar tudo
        changeDateTimeNow({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      // Calcular valores
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Verificar se os valores são válidos
      if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
        changeDateTimeNow({
          days: Math.max(0, days),
          hours: Math.max(0, hours),
          minutes: Math.max(0, minutes),
          seconds: Math.max(0, seconds),
        });
      }
    };

    // Executar imediatamente
    updateCountdown();

    // Configurar intervalo
    const IntervalDate = setInterval(updateCountdown, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(IntervalDate);
  }, [countDownDate, changeDateTimeNow]);

  return (
    <Container
      ref={targetRef}
      fluid
      p={0}
      w={"100%"}
      style={{
        background: `url(${noise})`,
        backgroundColor: getColor('countdownBackground') as string,
        position: "relative",
        contain: "layout",
      }}
      h={"150dvh"}
    >
      <Center w={"100%"} h={"100%"}>
        <Flex
          maw={"1200px"}
          justify={"center"}
          align={"center"}
          w="100%"
          direction={"column"}
          style={{ overflow: "hidden" }}
        >
          <Divider
            style={{
              opacity: isInView ? 1 : 0,
              transition: "all ease 1s",
              transform: isInView ? "translateX(0)" : "translateX(-100px)",
            }}
            w={{ base: "100%", sm: "50%" }}
            label={
              <Text
                ff={fontItaliana.style.fontFamily}
                tt={"uppercase"}
                fz={{ base: "1.5rem", md: "1.4rem" }}
                fw={600}
                c={getColor('countdownTextColor') as string}
                style={{
                  transform: isInView ? "translateY(0)" : "translateY(-100px)",
                  opacity: isInView ? 1 : 0,
                  transition: "all ease 0.2s",
                  transitionDelay: "0.4s",
                }}
              >
                Contagem regressiva
              </Text>
            }
            color="dark"
          />
          <Title
            style={{
              transition: "all ease 0.3s",
              transitionDelay: "0.5s",
              transform: isInView ? "translateX(0)" : "translateX(+100px)",
              opacity: isInView ? 1 : 0,
            }}
            p={{ base: "1rem", md: 0 }}
            ta={"center"}
            fz={{ base: "4rem", md: "5rem" }}
            ff={fontItaliana?.style?.fontFamily}
            c={getColor('countdownTextColor') as string}
          >
            {getContent("countdownTitle") || 'Caminho para o "Sim"'}
          </Title>
          <Flex w={"100%"} justify={"center"}>
            {/* TIME EXAMPLE */}
            <Grid
              w={{ base: "100%", md: "80%" }}
              p={{ base: "2rem", md: 0 }}
              gutter={{ base: "1rem", md: 0 }}
            >
              {hasPassed && (
                <Grid.Col
                  key={index}
                  span={{ base: 12 }}
                  style={{ marginTop: 20 }}
                >
                  <Box
                    w={"100%"}
                    p={"1rem"}
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href="https://www.instagram.com/dey.agath?upcoming_event_id=18032020418366245"
                      target="_blank"
                    >
                      <Button color="black" size="lg">
                        Acompanhar no Instagram
                      </Button>
                    </a>
                  </Box>
                </Grid.Col>
              )}

              {!hasPassed && (
                <>
                  {[...Array(4)].map((a, index) => (
                    <Grid.Col
                      key={index}
                      span={{ base: 6, md: 3 }}
                      style={{
                        transition: "all ease 0.2s",
                        transitionDelay: `${index * 0.2}s`,
                        transform: isInView
                          ? "translateY(0)"
                          : "translateY(-100px)",
                        opacity: isInView ? 1 : 0,
                      }}
                    >
                      <AspectRatio w={"100%"} ratio={10 / 10}>
                        <Flex w={"100%"} h={"100%"} p={"2.5rem"}>
                          <Center
                            w={"100%"}
                            h={"100%"}
                            style={{
                              border: `0.2rem solid ${getColor('countdownBorderColor')}`,
                              borderRadius: "1rem",
                              rotate: "45deg",
                            }}
                          >
                            <Flex
                              direction={"column"}
                              align={"center"}
                              justify={"center"}
                              style={{ rotate: "-45deg" }}
                            >
                              <Text
                                lh={{ base: "2rem", md: "2rem" }}
                                fw={500}
                                fz={{ base: "2rem", md: "2.4rem" }}
                                c={getColor('countdownTextColor') as string}
                              >
                                {
                                  {
                                    0: dateTimeNow.days,
                                    1: dateTimeNow.hours,
                                    2: dateTimeNow.minutes,
                                    3: dateTimeNow.seconds,
                                  }[index]
                                }
                              </Text>
                              <Text
                                fw={500}
                                fz={{ base: "1rem", md: "1.2rem" }}
                                c={getColor('countdownTextColor') as string}
                              >
                                {
                                  {
                                    0: "DIAS",
                                    1: "HORAS",
                                    2: "MINUTOS",
                                    3: "SEGUNDOS",
                                  }[index]
                                }
                              </Text>
                            </Flex>
                          </Center>
                        </Flex>
                      </AspectRatio>
                    </Grid.Col>
                  ))}
                </>
              )}
            </Grid>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
};
