interface BlogPost {
  id: number;
  title: string;
  excerpt?: string;
  date: string;
  image: string;
  imageCaption?: string;
  author: string;
  content: string | string[];
  category: string;
  likes?: number;
  comments?: number;
  tags?: string[];
  readingTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: 8,
    title: "Les tendances tech 2023",
    excerpt: "Découvrez les gadgets qui vont marquer cette année",
    date: "15 mars 2023",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    author: "Équipe SwiftShop",
    content: "Découvrez les technologies les plus innovantes et les tendances qui façonneront 2023.",
    category: "Technologie",
    likes: 0,
    comments: 0,
    tags: ["gadgets", "technologie", "tendances"],
    readingTime: 4 // Ajouté
  },
  {
    id: 7,
    title: "Comment choisir son casque audio",
    excerpt: "Notre guide complet pour faire le bon choix",
    date: "28 février 2023",
    image: "https://images.unsplash.com/photo-1585386959984-a4155228c3a1?auto=format&fit=crop&w=800&q=80",
    author: "Anaïs Dupont",
    content: "Un casque audio de qualité peut transformer votre expérience d'écoute. Voici nos conseils pour faire le bon choix.",
    category: "Conseils",
    likes: 0,
    comments: 0,
    tags: ["audio", "guide", "conseils"],
    readingTime: 6 // Ajouté
  },
  {
    id: 1,
    title: "Lancement de notre boutique en ligne",
    excerpt: "Découvrez notre nouvelle boutique en ligne", // Ajouté
    date: "08 Avril 2025 14:30",
    author: "L'Équipe SwiftShop",
    content: "Nous sommes ravis d'annoncer le lancement officiel de notre boutique e-commerce. Découvrez nos produits exclusifs à prix réduits !",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Nouveautés",
    likes: 24,
    comments: 5,
    tags: ["e-commerce", "lancement", "promotion"],
    readingTime: 3 // Ajouté
  },
  {
    id: 2,
    title: "5 astuces pour économiser sur vos achats",
    excerpt: "Nos meilleures astuces pour économiser", // Ajouté
    date: "01 Avril 2025 09:15",
    author: "Anaïs Dupont",
    content: "Vous cherchez à faire des économies ? Voici nos meilleures astuces pour acheter malin sur notre plateforme.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Conseils",
    likes: 42,
    comments: 12,
    tags: ["économie", "astuces", "guide"],
    readingTime: 5 // Ajouté
  },
  {
    id: 3,
    title: "Pourquoi choisir notre boutique ?",
    excerpt: "Découvrez ce qui fait notre différence", // Ajouté
    date: "25 Mars 2025 16:45",
    author: "John Doe",
    content: "Une livraison rapide, des produits de qualité, un service client réactif… Découvrez tout ce qui fait notre différence.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Informations",
    likes: 18,
    comments: 3,
    tags: ["qualité", "livraison", "service"],
    readingTime: 4 // Ajouté
  }
];

export default blogPosts;