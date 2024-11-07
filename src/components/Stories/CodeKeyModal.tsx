import { useState } from "react";
import { Modal, Button, TextInput, Text } from "@mantine/core";

export function CodeKeyModal({
  getCodeKey,
  saveCodeKey,
}: {
  getCodeKey: () => string | null;
  saveCodeKey: (codeKey: string) => Promise<void>;
}) {
  const [opened, setOpened] = useState(!getCodeKey());
  const [codeKey, setCodeKey] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  const handleSaveCodeKey = async () => {
    try {
      await saveCodeKey(codeKey);
      setOpened(false);
    } catch {
      setErrorModal(true);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {}}
        title="Acessar Stories"
        withCloseButton={false}
        styles={{
          content: { background: "#000" },
          header: { background: "#000", color: "#fff" },
        }}
      >
        <TextInput
          label="Digite o código de convite"
          placeholder="Digite o código de convite"
          value={codeKey}
          onChange={(event) => setCodeKey(event.currentTarget.value)}
        />
        <Button
          onClick={handleSaveCodeKey}
          mt="md"
          style={{
            color: "#ffde22",
            backgroundColor: "transparent",
            borderColor: "#ffde22",
            borderStyle: "solid",
            borderWidth: "2px",
          }}
        >
          Salvar código
        </Button>
      </Modal>

      <Modal
        opened={errorModal}
        onClose={() => setErrorModal(false)}
        title="Código inválido"
      >
        <Text color="red">Código de convite inválido, tente novamente</Text>
        <Button onClick={() => setErrorModal(false)} mt="md">
          Close
        </Button>
      </Modal>
    </>
  );
}
