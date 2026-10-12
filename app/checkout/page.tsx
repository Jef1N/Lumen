import type { Metadata } from "next";
import { CheckoutView } from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout — LUMEN",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
