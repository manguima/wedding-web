"use client";
import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Title,
  AspectRatio,
  Image,
  Flex,
  Text,
} from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export const ThankYouModal = () => {
  const [opened, setOpened] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === "#agradecer") {
      setOpened(true);
    }
  }, [params]);

  const handleClose = () => {
    router.replace("/presentes");
    setOpened(false);

    // // Remover o fragmento do URL
    // const currentUrlWithoutHash =
    //   window.location.pathname + window.location.search;
    // router.replace(currentUrlWithoutHash);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        style={{ position: "relative" }}
        styles={{
          body: { padding: 0 },
          content: {
            boxShadow: "10px 10px 0px 0px #96D398",
          },
        }}
        p={0}
        m={0}
      >
        <Flex direction={"column"}>
          <Title
            c={"#306B38"}
            order={1}
            tt={"uppercase"}
            fw={900}
            lh={"100%"}
            fz={"3rem"}
            ta={"center"}
            w={"100%"}
            mt={"3rem"}
            style={{
              position: "absolute",

              zIndex: 3,
              textShadow: "3px 3px 2px 0 #CFE3D2",
            }}
          >
            Seu Presente
            <br />
            foi Incrível!
          </Title>
          <AspectRatio mt={"6rem"} w={"100%"}>
            <Image width={"100%"} src={"images/thks.png"}></Image>
          </AspectRatio>
        </Flex>
        <Flex
          bg={"#306B38"}
          gap={"1rem"}
          mt={"-2rem"}
          p={"3rem"}
          direction={"column"}
          align={"center"}
          justify={"center"}
        >
          <Text fw={400} c={"white"} ta={"center"}>
            Muito obrigado por pensar em nós. Com carinho,{" "}
            <b>Deyse e Matheus.</b>
          </Text>
          <Button
            color="#93BE98"
            variant="outline"
            c={"#93BE98"}
            onClick={() => handleClose()}
          >
            Fechar
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
