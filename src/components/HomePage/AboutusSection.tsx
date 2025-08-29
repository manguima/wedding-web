"use client";
import { fontHailey, fontItaliana } from "@/utils/fonts";
import {
  AspectRatio,
  Box,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { useKabukiRoll } from "../KabukiRoll/KabukiRoll";
import { useEffect } from "react";
import { useLayoutContext } from "../layouts/LayoutProvider";
import { responsive } from "@/utils/responsive";
import { menuToView } from "../layouts/DefaultHeader";
import { useScrollIntoView } from "@mantine/hooks";
import { useInView } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export const AboutusSection = ({ index }: { index: number }) => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  // GET VALUES KABUKIROLL SECTIONS
  const { currentSection } = useKabukiRoll();

  // GET THEME DATA
  const { getAsset, getContent, getColor } = useTheme();

  // VALIDE VALUES KABUKI WITH HOME PROVIDER AND CHANGE VALUES
  useEffect(() => {
    if (currentSection === index + 1) {
      setPrimaryColor?.(getColor('aboutTextColor') as string);
      setSecondaryColor?.(getColor('aboutShadowColor') as string);
    }
  }, [currentSection, getColor]);

  // MENU TO VIEW
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: -10,
  });

  useEffect(() => {
    menuToView.setState({
      aboutus: { scrollIntoView },
    });
  }, [targetRef]);

  // ANIMATE
  const isInView = useInView(targetRef);
  const delay = 0.3;

  return (
    <Container
      ref={targetRef}
      fluid
      p={0}
      w={"100%"}
      h={"200svh"}
      style={{
        position: "relative",
        contain: "layout",
        paddingBottom: "20svh",
      }}
    >
      <Box
        w={"50rem"}
        right={{ base: "calc(100% - 20rem)", md: "calc(100% - 2rem)" }}
        style={{
          position: "absolute",
          bottom: "-4.5rem",
          transition: "all ease 0.4s",
          transitionDelay: "2s",
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(200px)",
        }}
      >
        <Image src={getAsset('tree2')} />
      </Box>

      <Center
        w={"100%"}
        h={"100svh"}
        style={{
          position: "sticky",
          top: "0svh",
        }}
      >
        <Grid
          maw={"1200px"}
          w={"100%"}
          gutter={{ base: "2rem", md: "4rem" }}
          p={{ base: "2rem", md: 0 }}
          style={{
            overflow: "hidden",
          }}
        >
          <Grid.Col visibleFrom="md" span={{ base: 12, md: 6 }}>
            <Center>
              <Box
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(100px)",
                  transition: "all ease 0.5s",
                  transitionDelay: `${delay}s`,
                  position: "relative",
                }}
                p={0}
                w={{ base: "100%", md: "70%" }}
              >
                <Box
                  style={{
                    borderRadius: "40rem 40rem 1rem 1rem",
                    boxShadow: `-10px 10px 0px 0px ${getColor('aboutShadowColor')}`,
                    overflow: "hidden",
                  }}
                >
                  <AspectRatio visibleFrom="md" w={"100%"} ratio={10 / 14}>
                    <Image src={getAsset('about_image')} />
                  </AspectRatio>
                  <AspectRatio hiddenFrom="md" w={"100%"} ratio={10 / 5}>
                    <Image src={getAsset('about_image')} />
                  </AspectRatio>
                </Box>
              </Box>
            </Center>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex
              h={"100%"}
              gap={{ base: "0.5", md: "1rem" }}
              direction={"column"}
              justify={"center"}
              align={"start"}
            >
              <Title
                fz={{ base: "2rem", md: "2.5rem" }}
                ff={fontItaliana.style.fontFamily}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateX(0)" : "translateX(100px)",
                  transition: "all ease 0.5s",
                  transitionDelay: `${delay}s`,
                }}
              >
                {getContent('aboutTitle') || 'Nossa História'}
              </Title>
              <Text
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateX(0)" : "translateX(100px)",
                  transition: "all ease 0.5s",
                  transitionDelay: `${delay * 2}s`,
                }}
                fz={{ base: "1rem", md: "1rem" }}
                c={getColor('textMuted') as string}
              >
                {getContent('aboutText') || 'Esta é a nossa história de amor. Nos conhecemos e nos apaixonamos, e agora queremos compartilhar este momento especial com vocês.'}
              </Text>
              <Text
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateX(0)" : "translateX(100px)",
                  transition: "all ease 0.5s",
                  transitionDelay: `${delay * 3}s`,
                }}
                mt={"2rem"}
                ff={fontHailey.style.fontFamily}
                fz={{ base: "3rem", md: "3rem" }}
                fw={400}
                lh={{ base: "4rem", md: "4.2rem" }}
              >
                “Vejam, saibam, considerem e compreendam que a mão do Senhor fez
                isso.”{" "}
                <b
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 400,
                  }}
                >
                  (IS 41:20)
                </b>
              </Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  );
};
