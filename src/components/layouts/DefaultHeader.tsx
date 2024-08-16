"use client";
import {
  Box,
  Burger,
  Center,
  Container,
  Flex,
  UnstyledButton,
} from "@mantine/core";
import { LogoIcon } from "../icons/LogoIcon";
import { useDisclosure, useHover } from "@mantine/hooks";
import { useLayoutContext } from "./LayoutProvider";
import { create } from "zustand";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UniqueToView = {
  scrollIntoView: ({ alignment }?: any | undefined) => void;
};

type StateToView = {
  home: UniqueToView;
  aboutus: UniqueToView;
  invite: UniqueToView;
  gift?: any;
};

export const menuToView = create<StateToView>((set) => ({
  home: { scrollIntoView: () => {} },
  aboutus: { scrollIntoView: () => {} },
  invite: { scrollIntoView: () => {} },
}));

export const DefaultHeader = ({
  position = "fixed",
}: {
  position?: "sticky" | "fixed";
}) => {
  const { primaryColor, secondaryColor, acceptedToPlay } = useLayoutContext();

  const [opened, { toggle }] = useDisclosure();

  return (
    <Container
      fluid
      id="headerMenu"
      p={{ base: "1.5rem", sm: "2rem" }}
      w={"100svw"}
      top={0}
      style={{
        background: "linear-gradient(180deg, #0F1D1430 0%, #0F1D1400 90%)",
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
          <Box w={{ base: "7rem", md: "8rem" }} style={{ zIndex: 3 }}>
            <LogoIcon
              width={"100%"}
              primaryColor={opened ? "white" : primaryColor}
              secondaryColor={opened ? "#E5C74D" : secondaryColor}
            />
          </Box>

          <Flex gap={"1rem"}>
            <Burger
              color={opened ? "#fff" : secondaryColor}
              hiddenFrom="md"
              size={"xl"}
              style={{ zIndex: 3 }}
              opened={opened}
              onClick={toggle}
            />
            <Flex
              top={0}
              left={0}
              display={{ base: opened ? "flex" : "none", md: "flex" }}
              gap={{ base: "1rem", md: "2rem" }}
              pt={{ base: "7rem", md: "unset" }}
              p={{ base: "2rem", md: "unset" }}
              w={{ base: "100%", md: "unset" }}
              pos={{ base: "fixed", md: "unset" }}
              bg={{ base: "#000", md: "unset" }}
              direction={{ base: "column", md: "row" }}
              justify={{ base: "center", md: "start" }}
              align={{ base: "center", md: "start" }}
              style={{ zIndex: "0" }}
            >
              {listNav.map((item, index) => (
                <Box
                  key={index}
                  fz={{ base: "2rem", md: "1rem" }}
                  onClick={toggle}
                >
                  <ButtonNav
                    key={index}
                    {...item}
                    index={index}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                  />
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
};

export const ButtonNav = ({
  label,
  url,
  index,
  action,
  primaryColor = "white",
  secondaryColor = "#E5C74D",
}: {
  label: string;
  url: string;
  index: number;
  action?: any;
  primaryColor?: string | undefined;
  secondaryColor?: string | undefined;
}) => {
  const { hovered, ref } = useHover<HTMLAnchorElement>();

  const router = useRouter();

  return (
    <UnstyledButton
      ref={ref}
      key={index}
      component={Link}
      href={url}
      fz={{ base: "unset", md: "1rem" }}
      fw={{ base: 300, md: 400 }}
      // onClick={!!action ? action : undefined}
      c={{ base: "white", md: hovered ? secondaryColor : primaryColor }}
    >
      {label}
    </UnstyledButton>
  );
};

export const listNav = [
  {
    label: "Início",
    url: "/",
    action: () => menuToView.getState().home?.scrollIntoView(),
  },
  {
    label: "Confirmar presença",
    url: "#confirm",
    action: () => menuToView.getState().invite?.scrollIntoView(),
  },
  {
    label: "Sobre Nós",
    url: "#aboutus",
    action: () => menuToView.getState().aboutus?.scrollIntoView(),
  },
  {
    label: "Lista de Presentes",
    url: "/presentes",
    // action: () => menuToView.getState().aboutus?.scrollIntoView(),
  },
  // { label: "Lista de presentes", url: "#gifts" },
];
