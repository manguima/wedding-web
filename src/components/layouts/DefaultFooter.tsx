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
        background: "#152510",
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
                    <ButtonNav {...item} index={index} />
                  ))}
                </Flex>
              </Flex>
            </Grid.Col>
          </Grid>
        </Flex>
      </Center>
    </Container>
  );
};
