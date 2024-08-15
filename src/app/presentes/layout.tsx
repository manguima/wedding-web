import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deyse & Matheus - Lista de Presentes",
  description: "Você está convidado para o nosso grande dia!",
};

export default ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
