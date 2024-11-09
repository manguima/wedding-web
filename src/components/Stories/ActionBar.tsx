import { ActionIcon, Button, Flex, Group, Stack } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { LogoIcon } from "../icons/LogoIcon";

export function ActionBar({
  onPost,
  codeKey,
  onSwitchView,
}: {
  onPost: () => void;
  codeKey: string | null;
  onSwitchView: () => void;
}) {
  return (
    <Flex
      style={{
        position: "fixed",
        zIndex: 1000,
        bottom: 0,
        left: 0,
        right: 0,
        background: "#191F10",
        padding: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <LogoIcon />

      <Group gap="md">
        <ActionIcon
          variant="filled"
          size="xl"
          radius="xl"
          onClick={onSwitchView}
          color="#E0C862"
          style={{
            color: "#191F10",
          }}
        >
          <IconPhoto />
        </ActionIcon>

        <Button
          variant="filled"
          size="lg"
          radius="xl"
          onClick={onPost}
          color="#E0C862"
          style={{
            color: "#191F10",
          }}
        >
          Poste seu momento
        </Button>
      </Group>
    </Flex>
  );
}
