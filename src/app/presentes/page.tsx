"use client";
import { ThankYouModal } from "@/components/Gifts/ThankYouModal";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { useLayoutContext } from "@/components/layouts/LayoutProvider";
import { categories, department } from "@/utils/categories";
import { convertToFloat, parseToFloat } from "@/utils/convertCurrency";
import { debounceInput } from "@/utils/debounceInput";
import { Product } from "@/zustand/types/product.type";
import { useCodeStore, useZustandContext } from "@/zustand/zustandProvider";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

export default () => {
  // GET VALUES HOME PROVIDER
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();

  const router = useRouter();

  useEffect(() => {
    setPrimaryColor?.("white");
    setSecondaryColor?.("#E5C74D");
  }, []);

  const formProducts = useForm({
    initialValues: {
      categ: "0",
      department: "0",
      name: "",
    },
  });

  const { fetchProductList, buyProduct } = useZustandContext();

  const { products } = useCodeStore();

  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category || "Todos";
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {} as Record<string, any[]>);
  }, [products]);

  useEffect(() => {
    fetchProductList({
      where: {
        category:
          formProducts.values.categ !== "0"
            ? {
                equals: formProducts.values.categ,
              }
            : undefined,
        department:
          formProducts.values.department !== "0"
            ? {
                equals: formProducts.values.department,
              }
            : undefined,
        name: {
          contains: !formProducts.values.name ? "" : formProducts.values.name,
        },
      },
    });
  }, [formProducts.values.categ, formProducts.values.department]);

  const handleBuyClick = async (product: Product) => {
    const productData = {
      value: parseToFloat(convertToFloat(product.price)),
      description: product.description,
      id: product.id,
      name: product.name,
      maxInstallmentCount: product.maxInstallmentCount,
    };

    if (product.productLink) {
      router.push(product.productLink);
    } else {
      buyProduct(productData);
    }
  };

  const handleInputChange = useCallback(
    debounceInput((value: string) => {
      fetchProductList({
        where: {
          category:
            formProducts.values.categ !== "0"
              ? {
                  equals: formProducts.values.categ,
                }
              : undefined,
          department:
            formProducts.values.department !== "0"
              ? {
                  equals: formProducts.values.department,
                }
              : undefined,
          name: {
            contains: !value ? "" : value,
          },
        },
      });
    }, 1000),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    formProducts.setFieldValue("name", value);
    handleInputChange(value);
  };

  return (
    <Container p={0} fluid>
      <ThankYouModal />
      <Flex direction={"column"} style={{ position: "relative" }}>
        <Flex
          gap={"2rem"}
          w={"100%"}
          style={{
            position: "absolute",
            zIndex: 2,
            background:
              "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
          }}
          p={"2rem"}
          align={"center"}
        >
          <LogoIcon />
          <Divider c={"white"} bg={"white"} orientation="vertical" />
          <Text c={"white"}>Lista de Presentes</Text>
        </Flex>
        <Flex w={"100%"}>
          <AspectRatio
            style={{ pointerEvents: "none", userSelect: "none" }}
            w={"100%"}
            ratio={10 / 3.5}
          >
            <Image
              style={{ filter: "brightness(60%)" }}
              w={"100%"}
              h={"100%"}
              src={"/images/bg-product.png"}
            />
          </AspectRatio>
        </Flex>
        <Flex px={"3rem"} w={"100%"} justify={"end"}>
          <Box
            style={{
              borderRadius: "0.5rem",
              position: "relative",
              boxShadow: "0 4px 8px 0px #00000080",
            }}
            p={"2rem"}
            mt={"-100px"}
            bg={"#152814"}
          >
            <Flex gap={"2rem"}>
              <Flex direction={"column"} gap={"1rem"}>
                <Flex direction={"column"}>
                  <Title c={"white"} order={2}>
                    Mais fácil de achar!
                  </Title>
                  <Text c={"#ffffff8a"}>
                    Já sabe o que dar de presente ? Não perca tempo procurando,
                    filtre aqui.
                  </Text>
                </Flex>
                <Flex gap={"2rem"}>
                  <TextInput
                    c={"white"}
                    placeholder="Nome do produto.."
                    label="Nome"
                    {...formProducts.getInputProps("name")}
                    onChange={onChange}
                  />
                  <Select
                    c={"white"}
                    label="Categoria"
                    data={[
                      { label: "Todos", value: "0" },
                      ...categories.map((categ) => ({
                        label: categ.name,
                        value: categ.id,
                      })),
                    ]}
                    {...formProducts.getInputProps("categ")}
                  />
                  <Select
                    c={"white"}
                    label="Departamento"
                    data={[
                      { label: "Todos", value: "0" },
                      ...department.map((dep) => ({
                        label: dep.name,
                        value: dep.id,
                      })),
                    ]}
                    {...formProducts.getInputProps("department")}
                  />
                </Flex>
              </Flex>
              <AspectRatio
                style={{ marginTop: "-200px" }}
                w={"20rem"}
                ratio={10 / 10}
              >
                <Image src={"images/chair.png"} />
              </AspectRatio>
            </Flex>
          </Box>
        </Flex>

        {Object.keys(groupedProducts).map((category) => (
          <Flex
            p={"3rem"}
            gap={"2rem"}
            mt={"3rem"}
            direction={"column"}
            key={category}
          >
            <Flex direction={"column"}>
              <Divider />
              <Text fw={700} size="xl" mt="md" mb="sm">
                {categories.filter((value) => value.id == category)[0]?.name}
              </Text>
              <Divider />
            </Flex>

            <Grid>
              {groupedProducts[category].map((product: any) => (
                <Grid.Col
                  span={{ md: 3, sm: 3, xs: 6, lg: 2 }}
                  key={product.id}
                >
                  <Card
                    h={"100%"}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                  >
                    <Flex
                      gap={"2rem"}
                      justify={"space-between"}
                      direction={"column"}
                      h={"100%"}
                    >
                      <Flex direction={"column"}>
                        <AspectRatio w={"100%"} ratio={10 / 10}>
                          <Image
                            width={"100%"}
                            style={{ objectFit: "contain" }}
                            src={`${
                              process.env.NEXT_PUBLIC_URL_API
                            }/media/uploads/${
                              product?.imageUrl?.split("/")[2]
                            }`}
                            height={160}
                            alt={product.name}
                          />
                        </AspectRatio>
                        <Text fz={"1rem"} fw={800}>
                          {product.name}
                        </Text>
                        <Text
                          size="sm"
                          style={{
                            WebkitLineClamp: 3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {product.description}
                        </Text>
                      </Flex>
                      <Flex direction={"column"}>
                        <Text fz={"1.7rem"} fw={900} size="lg" mt="md">
                          R$ {convertToFloat(product.price)}
                        </Text>
                        <Button
                          variant="light"
                          color="#aee7b6"
                          c={"dark"}
                          fullWidth
                          mt="md"
                          radius="md"
                          onClick={() => handleBuyClick(product)}
                        >
                          Presentear
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};
