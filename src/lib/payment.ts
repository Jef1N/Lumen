// Camada de pagamento ABSTRAÍDA.
// O checkout fala só com esta interface — trocar de gateway (Mercado Pago,
// Stripe, Pagar.me…) é implementar um novo provider e registrar aqui,
// sem tocar no fluxo de UI.

import type { CartItem } from "./cart";

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
};

export type CheckoutPayload = {
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
};

export type CheckoutResult =
  | { status: "redirect"; url: string } // gateway real → redireciona
  | { status: "pending"; message: string; whatsappUrl?: string } // placeholder atual
  | { status: "error"; message: string };

export interface PaymentProvider {
  readonly id: string;
  createCheckout(payload: CheckoutPayload): Promise<CheckoutResult>;
}

// ---------------------------------------------------------------------------
// Provider atual: placeholder. Gera um pedido via WhatsApp enquanto o gateway
// não está definido. Troque por um provider real quando decidir.
// ---------------------------------------------------------------------------

const WHATSAPP_NUMBER = ""; // ex.: "5511999999999" — preencher quando disponível

class PlaceholderProvider implements PaymentProvider {
  readonly id = "placeholder";

  async createCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
    const { items, customer, subtotal } = payload;
    const lines = items
      .map(
        (i) =>
          `• ${i.qty}x ${i.name}` +
          `${i.variant ? ` (${i.variant})` : ""} — ${i.size} — R$ ${(i.price * i.qty).toFixed(0)}`
      )
      .join("\n");

    const message =
      `Olá! Quero finalizar meu pedido na LUMEN:\n\n${lines}\n\n` +
      `Subtotal: R$ ${subtotal.toFixed(0)}\n\n` +
      `Nome: ${customer.name}\nEntrega: ${customer.address}, ${customer.number}` +
      `${customer.complement ? ` - ${customer.complement}` : ""}, ${customer.city}/${customer.state} — CEP ${customer.cep}`;

    if (WHATSAPP_NUMBER) {
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      return {
        status: "pending",
        message: "Pedido registrado. Finalize o pagamento pelo WhatsApp.",
        whatsappUrl,
      };
    }

    return {
      status: "pending",
      message:
        "Pedido recebido. O pagamento online entra em breve — entraremos em contato para finalizar.",
    };
  }
}

// Registro do provider ativo. Trocar aqui ao conectar o gateway real.
export const paymentProvider: PaymentProvider = new PlaceholderProvider();
