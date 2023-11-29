"use client";
import {
  AspectRatio,
  Box,
  Center,
  Container,
  Grid,
  Image,
} from "@mantine/core";

export const AboutusSection = () => {
  return (
    <Container fluid p={0} h={"100vh"}>
      <Center w={"100%"} h={"100%"}>
        <Grid>
          <Grid.Col span={6}>
            <AspectRatio ratio={14 / 10}>
              <Image src="./images/img_aboutus_section.png" />
            </AspectRatio>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box>111</Box>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  );
};
