"use client";
import { Box, Center, Container, Flex, UnstyledButton } from "@mantine/core";
import { LogoIcon } from "../icons/LogoIcon";
import Link from "next/link";
import { useDisclosure, useHover } from "@mantine/hooks";

export const DefaultHeader = ({
  position = "fixed",
}: {
  position?: "sticky" | "fixed";
}) => {
  return (
    <Container
      fluid
      p={{ base: "1rem", sm: "2rem" }}
      w={"100%"}
      style={{
        background: "linear-gradient(180deg, #0F1D1490 0%, #0F1D1400 100%)",
        position: position,
        zIndex: 10,
      }}
    >
      <Center>
        <Flex
          align={"center"}
          justify={"space-between"}
          maw={"1200px"}
          w={"100%"}
          style={{ position: "relative" }}
        >
          <Box>
            <LogoIcon width={"8rem"} />
          </Box>
          <Flex gap={"1rem"}>
            {listNav.map((item, index) => (
              <ButtonNav {...item} index={index} />
            ))}
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
};

const ButtonNav = ({
  label,
  url,
  index,
}: {
  label: string;
  url: string;
  index: number;
}) => {
  const { hovered, ref } = useHover<HTMLAnchorElement>();

  return (
    <UnstyledButton
      ref={ref}
      key={index}
      component={Link}
      href={url}
      styles={{
        root: {
          fontSize: "1rem",
          color: hovered ? "#E5C74D" : "white",
        },
      }}
    >
      {label}
    </UnstyledButton>
  );
};

const listNav = [
  { label: "Início", url: "/" },
  { label: "Confirmar presença", url: "#confirm" },
  { label: "Sobre Nós", url: "#aboutus" },
  { label: "Lista de presentes", url: "#gifts" },
];
