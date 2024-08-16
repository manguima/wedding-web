import { Card, Text, Button, AspectRatio, Image, Flex } from "@mantine/core";
import { convertToFloat } from "@/utils/convertCurrency";
import { Product } from "@/zustand/types/product.type";

interface ProductCardProps {
  product: Partial<Product>;
  onBuyClick: (product: Partial<Product>) => void;
}

const ProductCard = ({ product, onBuyClick }: ProductCardProps) => (
  <Card h={"100%"} shadow="sm" padding="lg" radius="md" withBorder>
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
            src={product?.imageUrl}
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
          R$ {convertToFloat((product.price as number) || 0)}
        </Text>
        <Button
          variant="light"
          color="#aee7b6"
          c={"dark"}
          fullWidth
          mt="md"
          radius="md"
          onClick={() => onBuyClick(product)}
        >
          Presentear
        </Button>
      </Flex>
    </Flex>
  </Card>
);

export default ProductCard;
