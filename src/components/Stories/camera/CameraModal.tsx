import { Box, Flex, useMantineTheme } from "@mantine/core";

export function CameraModal({
  open,
  actionButtons,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
  actionButtons: React.ReactNode;
}) {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        display: open ? "flex" : "none",
        zIndex: 10001,
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {children}
      </Box>

      <Flex
        p={2}
        display="flex"
        direction="row"
        align="center"
        justify="space-around"
        style={{
          pointerEvents: "auto",
          width: "100%",
          bgcolor: "black",
        }}
      >
        {actionButtons}
      </Flex>
    </Box>
  );
}
