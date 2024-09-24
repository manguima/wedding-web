import { Select, TextInput, Flex, Text, Title, Box } from "@mantine/core";
import { categories, department } from "@/utils/categories";
import { useForm } from "@mantine/form";
import { debounceInput } from "@/utils/debounceInput";

interface ProductFilterProps {
  onFilterChange: (values: {
    name: string;
    categ: string;
    department: string;
  }) => void;
}

const ProductFilter = ({ onFilterChange }: ProductFilterProps) => {
  const form = useForm({
    initialValues: {
      categ: "0",
      department: "0",
      name: "",
    },
    onValuesChange: (values) => {
      onFilterChange(values);
    },
  });

  const handleInputChange = debounceInput((value: string) => {
    form.setFieldValue("name", value);
  }, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // form.setFieldValue("name", value);
    handleInputChange(value);
  };

  return (
    <Flex px={{ base: "1rem", sm: "3rem" }} w={"100%"} justify={"end"}>
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
        <Flex direction={{ base: "column", sm: "row" }} gap={"2rem"}>
          <Flex direction={"column"} gap={"1rem"}>
            <Flex direction={"column"}>
              <Title c={"white"} order={2}>
                Mais fácil de achar!
              </Title>
              <Text c={"#ffffff8a"}>
                Já sabe o que dar de presente? Não perca tempo procurando,
                filtre aqui.
              </Text>
            </Flex>
            <Flex direction={{ base: "column", sm: "row" }} gap={"2rem"}>
              {/* <TextInput
                c={"white"}
                placeholder="Nome do produto.."
                label="Nome"
                // {...form.getInputProps("name")}
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
                {...form.getInputProps("categ")}
              /> */}
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
                {...form.getInputProps("department")}
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductFilter;
