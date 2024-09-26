"use client";
import { convertToFloat } from "@/utils/convertCurrency";
import { PaymentHistory, Product } from "@/zustand/types/product.type";
import {
  AspectRatio,
  Badge,
  Button,
  Flex,
  Image,
  InputWrapper,
  LoadingOverlay,
  Modal,
  Paper,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useId, useState } from "react";
import { usePaymentStore } from "@/zustand/slices/paymentStore";
import { useRouter } from "next/navigation";

interface ChildComponentProps {
  handleOpened: (toggleOpen: () => void) => void;
  product: Partial<Product>;
  onBuyClick: (product: Partial<Product>) => void;
}

export const ProductPayModal = ({
  handleOpened,
  product,
  onBuyClick,
}: ChildComponentProps) => {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const [name, setName] = useState(""); // Estado para armazenar o nome
  const [nameError, setNameError] = useState(false); // Estado para controlar o erro de nome
  const [physicalPayments, setPhysicalPayments] = useState<
    Partial<PaymentHistory>[]
  >([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const { fetchPayment, createPayment } = usePaymentStore.getState();

  // Buscar todos os pagamentos físicos existentes para este produto
  const fetchResult = async () => {
    const response = await fetchPayment({
      take: product.quantityDesired,
      skip: 0,
      where: {
        productId: product.id,
        status: "physical",
      },
    });

    console.log(response);

    return response;
  };

  useEffect(() => {
    const fetchAndSetPayments = async () => {
      if (opened) {
        const response = await fetchResult();
        console.log(response);

        if (response?.response) {
          setPhysicalPayments(response.response);
        }
      }
    };

    fetchAndSetPayments();
  }, [opened]);

  // Função que lida com o clique no botão de "Presentear Físico"
  const handlePhysicalGift = async () => {
    // Verifica se o nome está preenchido
    if (!name.trim()) {
      setNameError(true); // Exibe o erro se o nome estiver vazio
    } else {
      setNameError(false); // Remove o erro se o nome estiver preenchido

      // Chama a função para criar o pagamento físico
      await handlePhysicalGiftPayment(product, name);
    }
  };

  const handlePhysicalGiftPayment = async (
    product: Partial<Product>,
    name: string
  ) => {
    try {
      setLoadingCheckout(true);
      const paymentData = {
        productId: product.id,
        productName: product.name,
        amount: product.price,
        dueDate: new Date(),
        status: "physical",
        name,
      };

      const createResult = await createPayment(paymentData);
      if (!createResult.success) {
        console.error("Erro ao criar pagamento físico:", createResult.error);
        throw new Error(createResult.error || "Erro desconhecido");
      } else {
        router.push("#agradecer");
        console.log(
          "Pagamento físico criado com sucesso:",
          createResult.response
        );
      }
    } catch (error: any) {
      console.error("Erro no pagamento:", error);
      setErrorMessage(
        error.message ||
          "Erro ao criar pagamento físico, tente novamente mais tarde."
      );
    } finally {
      setLoadingCheckout(false);
      toggle();
    }
  };

  // Quando o componente é montado, passamos a função toggleOpen para o pai
  useEffect(() => {
    handleOpened(toggle);
  }, [handleOpened]);

  return (
    <Modal
      withCloseButton={false}
      c={"#fff"}
      radius={"lg"}
      styles={{
        header: { backgroundColor: "#1c3d00" },
        content: {
          backgroundColor: "#30640270",
          backdropFilter: "blur(13.5px)",
        },
        overlay: { backgroundColor: "#00000090" },
      }}
      centered
      overlayProps={{ blur: 5, backgroundOpacity: 0.55 }}
      opened={opened}
      onClose={toggle}
    >
      {errorMessage ? (
        <Flex>
          <Text>{errorMessage}</Text>
        </Flex>
      ) : (
        <Flex direction={"column"} gap={"1rem"}>
          <Paper p={"1rem"} radius={"md"} shadow="lg">
            <Flex>
              <AspectRatio w={"100%"} ratio={10 / 10}>
                <Image src={product.imageUrl} />
              </AspectRatio>
              <Table withRowBorders>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>
                      <Text fz={"1.2rem"} fw={500} c={"dark"}>
                        {product?.name}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <Text fz={"1rem"} fw={400} c={"dark"}>
                        {product?.description}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <Badge
                        radius={"sm"}
                        p={"1rem"}
                        color="#1c3d00"
                        fz={"1.2rem"}
                        fw={500}
                      >
                        R$ {convertToFloat(product.price as number)}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Flex>
          </Paper>
          <Paper p={"1rem"} radius={"md"} shadow="lg">
            <TextInput
              c={"dark"}
              label="Digite seu nome"
              placeholder="Ex: Marcos Oliveira"
              size="lg"
              value={name} // Associando o valor do input ao estado
              onChange={(event) => {
                setName(event.currentTarget.value);
                setNameError(false);
              }} // Atualizando o estado quando o usuário digitar
              error={
                nameError
                  ? "Por favor, preencha seu nome antes de continuar."
                  : undefined
              }
            />
          </Paper>
          <Flex direction={"column"}>
            <InputWrapper label="Deseja nos presentear comprando o produto você mesmo ? Clique no botão abaixo.">
              <Button
                mt={"1rem"}
                w={"100%"}
                fz={"1.2rem"}
                h={"4rem"}
                style={{ position: "relative" }}
                variant="outline"
                c={"#fff"}
                color="#fff"
                disabled={
                  !(physicalPayments.length < (product.quantityDesired || 0))
                }
                onClick={handlePhysicalGift}
              >
                {!(
                  physicalPayments.length < (product.quantityDesired || 0)
                ) && (
                  <Flex
                    style={{
                      top: 0,
                      left: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                    justify={"center"}
                    align={"center"}
                  >
                    <Text fw={"bold"} c={"dark"}>
                      Físico não disponível
                    </Text>
                  </Flex>
                )}
                Presentear Físico
              </Button>
            </InputWrapper>

            <Title order={3} ta={"center"}>
              ou
            </Title>

            <InputWrapper>
              <Button
                mt={"0.3rem"}
                w={"100%"}
                fz={"1.2rem"}
                h={"4rem"}
                variant="outline"
                c={"#fff"}
                color="#fff"
                onClick={() => onBuyClick(product)}
              >
                Presentear Online
              </Button>
            </InputWrapper>
          </Flex>
        </Flex>
      )}
      {loadingCheckout && <LoadingOverlay />}
    </Modal>
  );
};
