"use client";
import {
  AspectRatio,
  Box,
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

export const CountDownSection = ({ index }: { index: number }) => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  // GET VALUES KABUKIROLL SECTIONS
  const { currentSection } = useKabukiRoll();

  // VALIDE VALUES KABUKI WITH HOME PROVIDER AND CHANGE VALUES
  useEffect(() => {
    if (currentSection === index) {
      setPrimaryColor?.("black");
      setSecondaryColor?.("white");
    }
  }, [currentSection]);

  // ANIMATION
  const targetRef = useRef(null);
  const isInView = useInView(targetRef);

  // COUNTDOWN TIMER
  const countDownDate = new Date("Nov 9, 2024 15:30:00").getTime();

  const [dateTimeNow, changeDateTimeNow] = useSetState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const IntervalDate = setInterval(() => {
    const now = new Date().getTime();

    const distance = countDownDate - now;

    changeDateTimeNow({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    });
    changeDateTimeNow({
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    });
    changeDateTimeNow({
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    });
    changeDateTimeNow({
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    });

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(IntervalDate);
    }
  });

  return (
    <Container
      ref={targetRef}
      fluid
      p={0}
      w={"100%"}
      style={{
        background: `url(${noise})`,
        backgroundColor: "#E1F0D2",
        position: "relative",
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
                style={{
                  transform: isInView ? "translateY(0)" : "translateY(-100px)",
                  opacity: isInView ? 1 : 0,
                  transition: "all ease 0.2s",
                  transitionDelay: "0.4s",
                }}
              >
                Contagem
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
          >
            Caminho para o "Sim"
          </Title>
          <Flex w={"100%"} justify={"center"}>
            {/* TIME EXAMPLE */}
            <Grid
              w={{ base: "100%", md: "80%" }}
              p={{ base: "2rem", md: 0 }}
              gutter={{ base: "1rem", md: 0 }}
            >
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
                          border: "0.2rem solid #000000",
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
                          <Text fw={500} fz={{ base: "1rem", md: "1.2rem" }}>
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
            </Grid>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
};
