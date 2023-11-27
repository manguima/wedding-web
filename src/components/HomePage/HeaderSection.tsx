import { Container, Text } from "@mantine/core";

export const HeaderSection = ({ index }: any) => {
  return (
    <Container
      fluid
      p={0}
      mih={"100vh"}
      h={"100%"}
      style={{
        background: "#0F1C0B",
        backgroundImage: "url(images/img_header_section.png)",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center -32vw",
        backgroundBlendMode: "overlay",
      }}
    >
      <Text fw={900} tt={"uppercase"}>
        HeaderSection
      </Text>
    </Container>
  );
};
