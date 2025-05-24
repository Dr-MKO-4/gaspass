// scripts/generateDataFiles.ts
import dotenv from 'dotenv';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

dotenv.config();

interface BlogPostRaw {
  id: number;
  title: string;
  excerpt: string | null;
  date: string;
  image: string | null;
  imageCaption: string | null;
  author: string;
  content: any;
  category: string | null;
  likes: number;
  comments: number;
  readingTime: number;
  tags: string[];
}

async function queryTable<T>(client: Client, sql: string): Promise<T[]> {
  const res = await client.query<T>(sql);
  return res.rows;
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Création du dossier : ${dir}`);
  }
}

function writeFile<T>(outPath: string, varName: string, data: T): void {
  console.log(`✏️  Écriture de ${varName} dans ${outPath}`);
  const content = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.

export const ${varName} = ${JSON.stringify(data, null, 2)} as const;
`;
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`✅ Fichier généré : ${outPath}`);
}

async function main(): Promise<void> {
  const client = new Client({
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT),
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  await client.connect();
  console.log('✅ Connecté à PostgreSQL');

  const dataDir = path.resolve(__dirname, '../src/data');
  ensureDir(dataDir);

  // 1. Produits « featured »
  const products = await queryTable<{
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    stock: number;
  }>(client, `
    SELECT id, name, price, description, image, category, rating, stock
    FROM produit
    WHERE featured = true
    ORDER BY id;
  `);
  writeFile(path.join(dataDir, 'ProductData.ts'), 'featuredProducts', products);

  // 2. Avis (reviews)
  const reviews = await queryTable<{
    id: number;
    author: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
  }>(client, `
    SELECT id, author, avatar, rating, text, to_char(date, 'YYYY-MM-DD') AS date
    FROM review
    ORDER BY id;
  `);
  writeFile(path.join(dataDir, 'ReviewData.ts'), 'reviews', reviews);

  // 3. Articles de blog (blogPosts)
  const postsRaw = await queryTable<BlogPostRaw>(client, `
    SELECT
      bp.id,
      bp.title,
      bp.excerpt,
      to_char(bp.date, 'DD Mon YYYY HH24:MI') AS date,
      bp.image,
      bp.image_caption AS "imageCaption",
      bp.author,
      bp.content,
      c.name             AS category,
      bp.likes,
      bp.comments_count  AS comments,
      bp.reading_time    AS "readingTime",
      ARRAY_REMOVE(ARRAY_AGG(t.name), NULL) AS tags
    FROM blog_post bp
    LEFT JOIN category c   ON bp.category_id = c.id
    LEFT JOIN post_tag pt  ON bp.id = pt.post_id
    LEFT JOIN tag t        ON pt.tag_id = t.id
    GROUP BY bp.id, c.name
    ORDER BY bp.id;
  `);

  // Ici, content reste JSONB (chaîne ou tableau) et correspond à BlogPost.content
  writeFile(path.join(dataDir, 'BlogPostData.ts'), 'blogPosts', postsRaw);

  await client.end();
  console.log('🔒 Déconnexion de PostgreSQL');
}

main().catch(err => {
  console.error('❌ Erreur :', err);
  process.exit(1);
});
