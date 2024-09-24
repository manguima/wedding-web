import { useEffect, useState } from "react";
import {
  Flex,
  Divider,
  Grid,
  Text,
  ActionIcon,
  InputWrapper,
  Table,
  AspectRatio,
  Image,
} from "@mantine/core";
import ProductCard from "./ProductCard";
import { Product } from "@/zustand/types/product.type";
import { useZustandContext } from "@/zustand/zustandProvider";
import { categories } from "@/utils/categories";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";

interface ProductListProps {
  groupedProducts: Record<string, Partial<Product>[]>;
  onBuyClick: (product: Partial<Product>) => void;
}

const ProductList = ({ groupedProducts, onBuyClick }: ProductListProps) => {
  const [typeList, setTypeList] = useState<"box" | "table">("table");

  return (
    <>
      <InputWrapper
        label="Visualizar como"
        mt={{ base: "3rem" }}
        mb={{ base: "1rem", md: 0 }}
        c={"#00000080"}
        w={"100%"}
        px={{ base: "1rem", sm: "3rem" }}
      >
        <Flex gap={"0.5rem"}>
          <ActionIcon
            color={"#5fc55f"}
            size={"xl"}
            variant={typeList === "table" ? "filled" : "outline"}
            onClick={() => setTypeList("table")}
          >
            <IconList />
          </ActionIcon>
          <ActionIcon
            color={"#5fc55f"}
            size={"xl"}
            onClick={() => setTypeList("box")}
            variant={typeList === "box" ? "filled" : "outline"}
          >
            <IconLayoutGrid />
          </ActionIcon>
        </Flex>
      </InputWrapper>
      {Object.keys(groupedProducts).map((category, index) =>
        typeList === "box" ? (
          <Flex
            w={"100%"}
            p={{ base: "1rem", sm: "3rem" }}
            gap={"2rem"}
            mt={index === 0 ? 0 : { base: "1rem", sm: "1.5rem" }}
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
              {groupedProducts[category].map((product) => (
                <Grid.Col
                  span={{ md: 3, sm: 3, base: 6, lg: 2 }}
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                    onBuyClick={onBuyClick}
                    type="box"
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Flex>
        ) : (
          <Flex
            w={"100%"}
            p={{ base: "1rem", sm: "3rem" }}
            mt={index === 0 ? 0 : { base: "1rem", sm: "1.5rem" }}
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
            <Table
              cellPadding={"2rem"}
              // withColumnBorders
              withRowBorders
              // withTableBorder
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Imagem</Table.Th>
                  <Table.Th>Nome</Table.Th>
                  <Table.Th>Valor</Table.Th>
                  <Table.Th>Ação</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {groupedProducts[category].map((product) => (
                  <ProductCard
                    onBuyClick={onBuyClick}
                    product={product}
                    type="table"
                  />
                ))}
              </Table.Tbody>
            </Table>
          </Flex>
        )
      )}
    </>
  );
};

export default ProductList;
