import type { Metadata } from "next";
import { BagView } from "@/components/BagView";

export const metadata: Metadata = {
  title: "Sacola — LUMEN",
};

export default function SacolaPage() {
  return <BagView />;
}
