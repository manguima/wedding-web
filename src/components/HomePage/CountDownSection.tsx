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
import { useEffect } from "react";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { noise } from "@/utils/noise";
import { fontItaliana } from "@/utils/fonts";

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

  return (
    <Container
      fluid
      p={0}
      w={"100%"}
      style={{
        background: `url(${noise})`,
        backgroundColor: "#E1F0D2",
        position: "relative",
      }}
      h={"150vh"}
    >
      <Center w={"100%"} h={"100%"}>
        <Flex
          maw={"1200px"}
          justify={"center"}
          align={"center"}
          w="100%"
          direction={"column"}
        >
          <Divider
            w={{ base: "100%", sm: "50%" }}
            label="Contagem"
            color="dark"
            styles={{ label: { fontSize: "2rem" } }}
          />
          <Title fz={"5rem"} ff={fontItaliana?.style?.fontFamily}>
            Caminho para o "Sim"
          </Title>
          <Flex w={"100%"}>
            {/* TIME EXAMPLE */}
            <Grid w={"100%"}>
              {[...Array(4)].map(() => (
                <Grid.Col span={3}>
                  <AspectRatio w={"100%"} ratio={10 / 10}>
                    <Flex w={"100%"} h={"100%"} p={"4rem"}>
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
                          <Text lh={"3rem"} fz={"3rem"}>
                            00
                          </Text>
                          <Text fw={600}>Hora</Text>
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
