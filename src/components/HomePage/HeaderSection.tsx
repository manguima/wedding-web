import { fontHailey, fontItaliana } from "@/app/layout";
import { noise } from "@/utils/noise";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Text,
} from "@mantine/core";

export const HeaderSection = ({ index }: any) => {
  return (
    <Container
      fluid
      p={0}
      mih={"100vh"}
      h={"100%"}
      w={"100%"}
      style={{
        background: "#152417",
        backgroundImage: "url(images/img_header_section.png)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center -32vw",
        backgroundBlendMode: "overlay",
        position: "relative",
      }}
    >
      <Center w={"100%"} h={"100vh"}>
        <Flex
          direction={"column"}
          gap={"3rem"}
          mt={"24%"}
          justify={"center"}
          align={"center"}
          style={{ position: "relative" }}
        >
          <Flex
            align={"center"}
            direction={"column"}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            <Text
              fz={{ base: "1rem", sm: "5rem" }}
              c={"white"}
              lh={"2rem"}
              tt={"uppercase"}
              ff={fontItaliana.style.fontFamily}
            >
              Salve
            </Text>
            <Text
              fz={"10rem"}
              c="#E5C74D"
              lh={"8rem"}
              ff={fontHailey.style.fontFamily}
            >
              esta
            </Text>
            <Text
              ff={fontItaliana.style.fontFamily}
              fz={{ base: "1rem", sm: "5rem" }}
              tt={"uppercase"}
              lh={"3rem"}
              c="white"
            >
              Data
            </Text>
          </Flex>
          <Flex
            style={{ position: "absolute", top: 0, left: "calc(100% + 2rem)" }}
          >
            <Flex direction={"column"} gap={"1rem"}>
              {dateWedding.map((item, index) => (
                <Flex
                  key={index}
                  p={"1rem"}
                  style={{
                    background: "transparent",
                    border: "0.2rem solid white",
                    borderRadius: "0.4rem",
                    position: "relative",
                  }}
                >
                  <Text lh={"1.5rem"} fz={"1.5rem"} c={"white"}>
                    {item.value}
                  </Text>
                  <Flex
                    style={{ position: "absolute", left: "calc(100% + 1rem)" }}
                  >
                    <Text c={"white"} fz={"1rem"} tt={"capitalize"}>
                      {item.label}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Button
            variant="outline"
            radius={"2rem"}
            color="#E5C74D"
            style={{ zIndex: 3 }}
          >
            Confirmar Presença
          </Button>
        </Flex>
      </Center>
      <Box
        w={"100%"}
        h={"100%"}
        style={{
          opacity: 0.5,
          position: "absolute",
          top: 0,
          left: 0,
          background: `url(${noise})`,
        }}
      ></Box>
    </Container>
  );
};

const dateWedding = [
  { value: "09", type: "day", label: "dia" },
  { value: "11", type: "month", label: "mês" },
  { value: "24", type: "year", label: "ano" },
];
