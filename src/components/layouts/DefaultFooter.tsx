"use client";
import { ActionIcon, Center, Container, Flex, Grid, Text } from "@mantine/core";
import { LogoIcon } from "../icons/LogoIcon";
import { IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import { ButtonNav, listNav } from "./DefaultHeader";

export const DefaultFooter = () => {
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
          <Flex w={"100%"} maw={"1200px"} py={"1rem"} justify={"space-between"}>
            <Text c={"#64815C"}>Criado por Matheus & Deyse</Text>
            <Text c={"#64815C"}>Copyright - 2024 ®</Text>
          </Flex>
        </Center>
      </Flex>
    </Container>
  );
};
