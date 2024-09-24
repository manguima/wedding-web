"use client";
import ProductFilter from "@/components/Gifts/ProductFilter";
import ProductList from "@/components/Gifts/ProductList";
import { ThankYouModal } from "@/components/Gifts/ThankYouModal";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { useLayoutContext } from "@/components/layouts/LayoutProvider";
import { categories, department } from "@/utils/categories";
import { convertToFloat, parseToFloat } from "@/utils/convertCurrency";
import { debounceInput } from "@/utils/debounceInput";
import { useProductStore } from "@/zustand/slices/productStore";
import { Product } from "@/zustand/types/product.type";
import { useCodeStore, useZustandContext } from "@/zustand/zustandProvider";
import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  Image,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const takeSize = 100;

export default () => {
  const { setPrimaryColor, setSecondaryColor } = useLayoutContext();
  const {
    fetchProductList,
    products,
    buyProduct,
    loadProductList,
    updateProducts,
    count,
  } = useProductStore();

  const [skip, setSkip] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  const ref = useRef(null);
  const isInView = useInView(ref);

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

  const groupedProducts = useMemo(() => {
    if (Number(formProducts.values.department) > 0) {
      return products.reduce((acc, product) => {
        const department = product.department || "0";
        if (!acc[department]) acc[department] = [];
        acc[department].push(product);
        return acc;
      }, {} as Record<string, Partial<Product>[]>);
    } else {
      return products.reduce((acc, product) => {
        const category = product.category || "0";
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
      }, {} as Record<string, Partial<Product>[]>);
    }
  }, [products]);

  const handleProducts = async (
    take: number = 100,
    skip: number = 0,
    currentCategoryIndex = 1
  ) => {
    await loadProductList({
      skip,
      take,
      where: {
        category:
          formProducts.values.categ !== "0"
            ? {
                equals: formProducts.values.categ,
              }
            : !formProducts.values.name &&
              formProducts.values.department === "0" &&
              formProducts.values.categ === "0"
            ? { equals: currentCategoryIndex }
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

    if (
      categories.length > currentCategoryIndex &&
      formProducts.values.categ === "0"
    ) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  useEffect(() => {
    if (
      categories.length > currentCategoryIndex &&
      currentCategoryIndex !== 1 &&
      formProducts.values.categ === "0"
    ) {
      if (count < 3) {
        handleProducts(undefined, undefined, currentCategoryIndex + 1);
      }
    }
  }, [count]);

  useEffect(() => {
    if (
      formProducts.values.categ !== "0" ||
      formProducts.values.name ||
      formProducts.values.department !== "0"
    ) {
      setCurrentCategoryIndex(0);
      updateProducts([]);
      fetchProductList({
        skip: 0,
        take: 100,
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
    }
  }, [
    formProducts.values.categ,
    formProducts.values.name,
    formProducts.values.department,
  ]);

  useEffect(() => {
    if (
      isInView &&
      categories.length > currentCategoryIndex &&
      formProducts.values.categ === "0" &&
      !formProducts.values.name &&
      formProducts.values.department === "0"
    ) {
      handleProducts(takeSize, skip, currentCategoryIndex);
    } else if (categories.length < currentCategoryIndex) {
      setHasMore(false);
    }
  }, [isInView]);

  const handleBuyClick = async (product: Partial<Product>) => {
    const productData = {
      value: parseToFloat(convertToFloat(product.price as number)),
      description: product.description,
      id: product.id,
      name: product.name,
      maxInstallmentCount: product.maxInstallmentCount,
    };

    if (!!product.productLink) {
      router.push(product.productLink);
    } else {
      buyProduct(productData);
    }
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
          p={"3rem"}
          align={"center"}
        >
          <Box w={"8rem"}>
            <LogoIcon width={"100%"} />
          </Box>
          <Divider c={"white"} bg={"white"} orientation="vertical" />
          <Text fz={"1.4rem"} c={"white"}>
            Lista de Presentes
          </Text>
        </Flex>
        <Flex hiddenFrom="sm" w={"100%"}>
          <AspectRatio
            style={{ pointerEvents: "none", userSelect: "none" }}
            w={"100%"}
            ratio={10 / 10}
          >
            <Image
              style={{ filter: "brightness(60%)" }}
              w={"100%"}
              h={"100%"}
              src={"/images/bg-product.png"}
            />
          </AspectRatio>
        </Flex>
        <Flex visibleFrom="sm" w={"100%"}>
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
        <Flex direction={"column"}>
          <ProductFilter
            onFilterChange={(filters) => {
              updateProducts([]);
              formProducts.setFieldValue("categ", filters.categ);
              formProducts.setFieldValue("name", filters.name);
              formProducts.setFieldValue("department", filters.department);
            }}
          />
          <ProductList
            groupedProducts={groupedProducts}
            onBuyClick={handleBuyClick}
          />
          {hasMore && (
            <Flex mt={"-30rem"} ref={ref} w={"100%"} h={"2rem"}></Flex>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
