"use client";
import { ActionIcon, Center, Container, Flex, Grid, Text } from "@mantine/core";
import { LogoIcon } from "../icons/LogoIcon";
import {
  IconBrandLinkedin,
  IconPlayerPlay,
  IconPlayerStop,
} from "@tabler/icons-react";
import Link from "next/link";
import { ButtonNav, listNav } from "./DefaultHeader";
import { useLayoutContext } from "./LayoutProvider";
import ReactPlayer from "react-player";

export const DefaultFooter = () => {
  const { togglePlay, playing, playerRef } = useLayoutContext();
  return (
    <Container
      fluid
      p={0}
      style={{
        background: "#171F0E",
      }}
    >
      <Center w={"100%"} p={"2rem"}>
        <Flex w={"1200px"}>
          <Grid gutter={"4rem"}>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex direction={"column"} gap={"1.5rem"}>
                <Flex direction={"column"} gap={"0.5rem"}>
                  <LogoIcon width={"12rem"} />
                  <Text c={"white"} fz={"1rem"} lh={"1.2rem"}>
                    Site desenvolvido pelos noivos com viés informativo acerca
                    do evento. Caso tenha interesse em desenvolver um site para
                    a sua empresa ou evento, entre em contato.
                  </Text>
                </Flex>
                <Flex direction={"row"} gap={"1rem"}>
                  <ActionIcon
                    component={Link}
                    target="_blank"
                    href={
                      "https://www.linkedin.com/in/matheus-guimar%C3%A3es-790a31251/"
                    }
                    size={"3rem"}
                    color={"#E5C74D"}
                  >
                    <IconBrandLinkedin color="#79630b" />
                  </ActionIcon>
                  <ActionIcon
                    onClick={togglePlay}
                    color={"#E5C74D"}
                    size={"3rem"}
                    title={playing ? "Parar" : "Iniciar"}
                  >
                    {playing ? (
                      <IconPlayerStop color="#79630b" />
                    ) : (
                      <IconPlayerPlay color="#79630b" />
                    )}
                  </ActionIcon>
                </Flex>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex direction={"column"}>
                <Text fw={700} fz={"1.4rem"} c={"white"}>
                  Menu
                </Text>
                <Flex direction={"column"}>
                  {listNav.map((item, index) => (
                    <ButtonNav key={index} {...item} index={index} />
                  ))}
                </Flex>
              </Flex>
            </Grid.Col>
          </Grid>
        </Flex>
      </Center>
      <Flex w={"100%"} style={{ background: "#11170A" }}>
        <Center w={"100%"}>
          <Flex
            w={"100%"}
            maw={"1200px"}
            py={{ base: "1rem", md: "1rem" }}
            px={{ base: "2rem", md: "0" }}
            justify={"space-between"}
          >
            <Text c={"#64815C"}>Criado por Matheus & Deyse</Text>
            <Text c={"#64815C"}>Copyright - 2024 ®</Text>
          </Flex>
        </Center>
      </Flex>
      <ReactPlayer
        ref={playerRef}
        url="evoce.mp3"
        playing={playing}
        controls={false}
        width="0"
        height="0"
        volume={0.6}
      />
    </Container>
  );
};
