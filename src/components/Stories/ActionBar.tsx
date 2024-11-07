import { Button, Flex } from "@mantine/core";

export function ActionBar({ onPost }: { onPost: () => void }) {
  return (
    <Flex
      style={{
        position: "fixed",
        zIndex: 1000,
        bottom: 0,
        left: 0,
        right: 0,
        background:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        style={{
          color: "#ffde22",
          backgroundColor: "transparent",
          borderColor: "#ffde22",
          borderStyle: "solid",
          borderWidth: "2px",
          fontSize: "1.2rem",
        }}
        onClick={onPost}
      >
        Poste seu momento
      </Button>
    </Flex>
  );
}
