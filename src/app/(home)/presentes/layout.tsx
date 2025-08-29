import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deyse & Matheus - Lista de Presentes",
  description:
    "Encontre o presente perfeito para marcar esse momento especial em nossas vidas. Sua escolha fará parte de nossa história.",
  openGraph: {
    title: "Deyse & Matheus - Lista de Presentes",
    description:
      "Encontre o presente perfeito para marcar esse momento especial em nossas vidas. Sua escolha fará parte de nossa história.",
    url: "https://deimatch.com.br/presentes",
    images: [
      {
        url: "https://deimatch.com.br/backgroundUrl.jpg",
        width: 400,
        height: 300,
      },
    ],
    type: "website",
  },
};

export default ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
