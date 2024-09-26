import {
  Card,
  Text,
  Button,
  AspectRatio,
  Image,
  Flex,
  Table,
} from "@mantine/core";
import { convertToFloat } from "@/utils/convertCurrency";
import { Product } from "@/zustand/types/product.type";
import { ProductPayModal } from "./ProductPayModal";

interface ProductCardProps {
  product: Partial<Product>;
  onBuyClick: (product: Partial<Product>) => void;
  type: "table" | "box";
}

const ProductCard = ({ product, onBuyClick, type }: ProductCardProps) => {
  let toggleOpenFromChild: (() => void) | undefined;

  // Exemplo de função que pode ser chamada no pai para abrir/fechar
  const handleToggleOpen = () => {
    if (toggleOpenFromChild) {
      toggleOpenFromChild(); // Chama a função do filho
    }
  };

  return (
    <>
      <ProductPayModal
        handleOpened={(toggleFn) => {
          toggleOpenFromChild = toggleFn;
        }}
        onBuyClick={onBuyClick}
        product={product}
      />
      {type === "box" ? (
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
                variant="filled"
                color="#86e593"
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
      ) : (
        <Table.Tr>
          <Table.Td w={"10%"}>
            <AspectRatio w={"6rem"} ratio={10 / 10}>
              <Image
                style={{ objectFit: "contain" }}
                src={product?.imageUrl}
                alt={product.name}
              />
            </AspectRatio>
          </Table.Td>
          <Table.Td w={"50%"}>
            <Text fz={"1rem"} fw={800}>
              {product.name}
            </Text>
          </Table.Td>
          <Table.Td w={"20%"}>
            <Text fz={"1.4rem"} fw={800} size="lg" mt="md">
              R$ {convertToFloat((product.price as number) || 0)}
            </Text>
          </Table.Td>
          <Table.Td w={"20%"}>
            <Button
              variant="filled"
              color="#86e593"
              c={"dark"}
              fullWidth
              mt="md"
              radius="md"
              onClick={handleToggleOpen}
            >
              Presentear
            </Button>
          </Table.Td>
        </Table.Tr>
      )}
    </>
  );
};

export default ProductCard;
