"use client";
import { ActionIcon, Center, Container, Flex, Grid, Text, Image } from "@mantine/core";
import { LogoIcon } from "../icons/LogoIcon";
import {
  IconBrandLinkedin,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import Link from "next/link";
import { ButtonNav, listNav } from "./DefaultHeader";
import { useLayoutContext } from "./LayoutProvider";
import { useTheme } from "@/contexts/ThemeContext";
import { useTenant } from "@/contexts/TenantContext";

export const DefaultFooter = () => {
  const { acceptedToPlay, setAcceptedToPlay } = useLayoutContext();
  const { getAsset, getColor } = useTheme();
  const { tenant } = useTenant();
  
  // Determinar se deve usar logo customizada ou padrão
  const logoUrl = getAsset('logo');
  const hasCustomLogo = logoUrl && !logoUrl.includes('/images/logo.svg');
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
                  {hasCustomLogo ? (
                    <Image 
                      src={logoUrl} 
                      alt={tenant?.name || "Logo"}
                      fit="contain"
                      width="12rem"
                      style={{ maxHeight: '80px' }}
                    />
                  ) : (
                    <LogoIcon width={"12rem"} />
                  )}
                  <Text c={getColor('textLight') as string} fz={"1rem"} lh={"1.2rem"}>
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
                    color={getColor('primaryColor') as string}
                  >
                    <IconBrandLinkedin color={getColor('textDark') as string} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      if (acceptedToPlay) {
                        setAcceptedToPlay(false);
                      } else {
                        setAcceptedToPlay(true);
                      }
                    }}
                    color={getColor('primaryColor') as string}
                    size={"3rem"}
                    title={acceptedToPlay ? "Parar Música" : "Iniciar Música"}
                  >
                    {acceptedToPlay ? (
                      <IconPlayerPause color={getColor('textDark') as string} />
                    ) : (
                      <IconPlayerPlay color={getColor('textDark') as string} />
                    )}
                  </ActionIcon>
                </Flex>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Flex direction={"column"}>
                <Text fw={700} fz={"1.4rem"} c={getColor('textLight') as string}>
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
            <Text c={getColor('textMuted') as string}>Criado por Matheus & Deyse</Text>
            <Text c={getColor('textMuted') as string}>Copyright - 2024 ®</Text>
          </Flex>
        </Center>
      </Flex>
    </Container>
  );
};
