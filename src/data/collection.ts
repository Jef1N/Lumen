// Dados da coleção — editáveis à mão até existir CMS/e-commerce.
// Placeholders de imagem são resolvidos por aspect ratio (ver componente Placeholder).

export type Variant = {
  id: string;
  label: string; // ex.: "Preto", "Off-white"
};

export type Product = {
  slug: string;
  category: string; // voz mono, ex.: "OVER", "CONJUNTO"
  name: string;
  price: number; // em reais
  verse: string; // versículo editorial (voz serif)
  verseRef: string; // referência, ex.: "Mt 25.4"
  description: string;
  variants?: Variant[];
  sizes: string[];
  gallery: number; // nº de slots de imagem na PDP
  featured?: boolean; // destaque no grid editorial
};

export const COLLECTION = {
  slug: "santidade",
  name: "Santidade",
  index: "01",
  statement:
    "A primeira coleção da Lumen. Peças que carregam a mensagem sem precisar anunciá-la.",
  story: [
    "Santidade é a primeira coleção da Lumen. Nasceu de uma pergunta simples: como vestir a fé sem que ela vire fantasia.",
    "Cada peça parte de uma passagem bíblica e a traduz em imagem — a camisa do Brasil em Cristo, a parábola das dez virgens na barra de uma camiseta, o lettering que repete a palavra como quem não esquece. Design primeiro; a mensagem vem com ele.",
    "Produção em tiragem limitada, enquanto durar o lançamento. Depois, outro capítulo.",
  ],
};

export const ABOUT = {
  lead: "Lumen significa luz.",
  story: [
    "A Lumen começou numa vontade específica: produzir camisetas para a igreja que não tivessem cara de camiseta de igreja. Peças que a pessoa veste no dia a dia, no rolê, com orgulho — e que carregam a mensagem junto.",
    "Streetwear cristão, design de autor. Cada peça nasce de uma passagem e se destaca primeiro pela estética. Quem vê, vê a roupa. A mensagem vem logo atrás, sem precisar gritar.",
    "Trabalhamos por lançamento, em tiragem limitada. Menos pressa, mais intenção — o melhor design, o melhor material, o melhor posicionamento.",
  ],
};

export const PRODUCTS: Product[] = [
  {
    slug: "over-jesus-e-brasileiro",
    category: "OVER",
    name: "Jesus é Brasileiro",
    price: 150,
    verse: "Ide por todo o mundo e pregai o evangelho a toda criatura.",
    verseRef: "Mc 16.15",
    description:
      "Camiseta oversized em tecido branco. Estampa de Jesus vestindo a camisa do Brasil — fé e identidade na mesma peça.",
    sizes: ["P", "M", "G", "GG"],
    gallery: 3,
    featured: true,
  },
  {
    slug: "over-guarde-o-azeite",
    category: "OVER",
    name: "Guarde o Azeite",
    price: 150,
    verse: "As prudentes levaram azeite nas suas vasilhas, com as suas lâmpadas.",
    verseRef: "Mt 25.4",
    description:
      "Camiseta oversized com pintura monocromática das dez virgens na barra. Disponível em preto e off-white.",
    variants: [
      { id: "preto", label: "Preto" },
      { id: "off-white", label: "Off-white" },
    ],
    sizes: ["P", "M", "G", "GG"],
    gallery: 3,
  },
  {
    slug: "conjunto-santidade",
    category: "CONJUNTO",
    name: "Santidade",
    price: 300,
    verse: "Segui a paz com todos e a santificação, sem a qual ninguém verá o Senhor.",
    verseRef: "Hb 12.14",
    description:
      "Conjunto de moletom branco — casaco e calça — com lettering Santidade. Peso, caimento e acabamento de peça de autor.",
    sizes: ["P", "M", "G", "GG"],
    gallery: 4,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
