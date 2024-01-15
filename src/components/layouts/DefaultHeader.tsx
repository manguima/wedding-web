"use client";
import { Box, Center, Container, Flex, UnstyledButton } from "@mantine/core";
import { LogoIcon } from "../icons/LogoIcon";
import { useHover } from "@mantine/hooks";
import { useLayoutContext } from "./LayoutProvider";
import { create } from "zustand";

type UniqueToView = {
  scrollIntoView: ({ alignment }?: any | undefined) => void;
};

type StateToView = {
  home: UniqueToView;
  aboutus: UniqueToView;
  invite: UniqueToView;
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
  const { primaryColor, secondaryColor } = useLayoutContext();

  return (
    <Container
      fluid
      p={{ base: "1rem", sm: "2rem" }}
      w={"100%"}
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
          <Box>
            <LogoIcon
              width={"8rem"}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </Box>
          <Flex gap={"1rem"}>
            {listNav.map((item, index) => (
              <ButtonNav
                key={index}
                {...item}
                index={index}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            ))}
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
  action: () => void;
  primaryColor?: string | undefined;
  secondaryColor?: string | undefined;
}) => {
  const { hovered, ref } = useHover<HTMLButtonElement>();

  return (
    <UnstyledButton
      ref={ref}
      key={index}
      onClick={action}
      styles={{
        root: {
          fontSize: "1rem",
          color: hovered ? secondaryColor : primaryColor,
        },
      }}
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
  // { label: "Lista de presentes", url: "#gifts" },
];
