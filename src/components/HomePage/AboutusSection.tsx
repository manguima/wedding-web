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

export const AboutusSection = () => {
  return (
    <Container fluid p={0} w={"100%"} h={"150vh"}>
      <Center w={"100%"} h={"100vh"} style={{ position: "sticky", top: 0 }}>
        <Grid maw={"1200px"} w={"100%"} gutter={"4rem"}>
          <Grid.Col span={6}>
            <Center>
              <Box p={0} w={"70%"} style={{ position: "relative" }}>
                <Box>
                  <AspectRatio
                    style={{
                      borderRadius: "15rem 15rem 1rem 1rem",
                      boxShadow: "-10px 10px 0px 0px #dddddd",
                      overflow: "hidden",
                    }}
                    w={"100%"}
                    ratio={10 / 14}
                  >
                    <Image src="images/img_aboutus_section.png" />
                  </AspectRatio>
                </Box>
              </Box>
            </Center>
          </Grid.Col>

          <Grid.Col span={6}>
            <Flex
              h={"100%"}
              gap={"1rem"}
              direction={"column"}
              justify={"center"}
              align={"start"}
            >
              <Title fz={"2rem"} ff={fontItaliana.style.fontFamily}>
                Um pouco sobre nós
              </Title>
              <Text fz={"1rem"}>
                Nos apaixonamos um pelo outro, cativados pela paciência e
                bondade, reconhecendo que Deus é o centro desse amor. Ao longo
                dos anos, enfrentamos desafios, pedimos desculpas quando
                necessário, crescemos juntos, mantivemos a fé um no outro e em
                Deus, aguardamos momentos especiais e superamos obstáculos
                juntos. Acreditamos que esse amor, ancorado em nossa fé e
                comprometimento, é eterno, destinado a durar para sempre. Nos
                alegramos em poder dizer que estamos em direção ao altar, em
                busca de eternizar esse amor. Assim não sendo dois, mas uma só
                carne e desejamos que...
              </Text>
              <Text
                mt={"2rem"}
                ff={fontHailey.style.fontFamily}
                fz={"4rem"}
                fw={400}
                lh={"4.2rem"}
              >
                “Vejam, saibam, considerem e compreendam que a mão do Senhor fez
                isso.” (IS 41:20)
              </Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  );
};
