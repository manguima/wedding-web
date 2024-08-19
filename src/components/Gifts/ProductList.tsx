import { useEffect, useState } from "react";
import { Flex, Divider, Grid, Text } from "@mantine/core";
import ProductCard from "./ProductCard";
import { Product } from "@/zustand/types/product.type";
import { useZustandContext } from "@/zustand/zustandProvider";
import { categories } from "@/utils/categories";

interface ProductListProps {
  groupedProducts: Record<string, Partial<Product>[]>;
  onBuyClick: (product: Partial<Product>) => void;
}

const ProductList = ({ groupedProducts, onBuyClick }: ProductListProps) => (
  <>
    {Object.keys(groupedProducts).map((category) => (
      <Flex
        w={"100%"}
        p={{ base: "1rem", sm: "3rem" }}
        gap={"2rem"}
        mt={{ base: "1rem", sm: "3rem" }}
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
            <Grid.Col span={{ md: 3, sm: 3, base: 6, lg: 2 }} key={product.id}>
              <ProductCard product={product} onBuyClick={onBuyClick} />
            </Grid.Col>
          ))}
        </Grid>
      </Flex>
    ))}
  </>
);

export default ProductList;
