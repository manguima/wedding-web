import { usePaymentStore } from "@/zustand/slices/paymentStore";
import { PaymentHistory, Product } from "@/zustand/types/product.type";
import { randomUUID } from "crypto";
import { useRouter } from "next/navigation";

// Função para criar um pagamento físico com validação de quantidade desejada
export const handlePhysicalGiftPayment = async (
  product: Partial<Product>,
  name: string
) => {
  const { createPayment } = usePaymentStore.getState();

  const router = useRouter();

  try {
    // Se a quantidade permitir, criar o novo pagamento
    const paymentData = {
      id: randomUUID(),
      productId: product.id,
      productName: product.name,
      amount: product.price,
      dueDate: new Date(), // Definir a data de vencimento conforme necessário
      // paymentLink: null, // Pode ser gerado via outra lógica
      status: "physical",
      name, // Nome opcional fornecido pelo usuário
      createdAt: new Date(),
      updatedAt: new Date(),
      product: product, // Relacionamento com o produto
    };

    const createResult = await createPayment(paymentData);

    if (!createResult.success) {
      throw createResult.error;
    } else {
      console.log(
        "Pagamento físico criado com sucesso:",
        createResult.response
      );

      router.push("#agradecer");
    }
  } catch (error) {
    console.error("Erro ao criar pagamento físico:", error);
    throw error;
  }
};
