// scripts/generateDataFiles.cjs
require('dotenv').config();
const { Client } = require('pg');
const fs   = require('fs');
const path = require('path');

async function queryTable(client, sql) {
  try {
    const res = await client.query(sql);
    return res.rows;
  } catch (err) {
    console.error('❌ Erreur lors de la requête SQL :', err.message);
    throw err;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Création du dossier : ${dir}`);
  }
}

function writeFile(outPath, varName, data) {
  console.log(`✏️  Écriture de ${varName} dans ${outPath}`);
  const content = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.

export const ${varName} = ${JSON.stringify(data, null, 2)} as const;
`;
  try {
    fs.writeFileSync(outPath, content, 'utf-8');
    console.log(`✅ Fichier généré : ${outPath}`);
  } catch (err) {
    console.error(`❌ Impossible d'écrire le fichier ${outPath} :`, err.message);
    throw err;
  }
}

async function main() {
  // Connexion à PostgreSQL
  const client = new Client({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();
    console.log('✅ Connecté à PostgreSQL');

    // Calcul du dossier de sortie : ../../src/data par rapport à scripts/
    const dataDir = path.resolve(__dirname, '../../src/data');
    ensureDir(dataDir);

    // 1. Produits « featured »
    // On récupère la catégorie via category_id, on peut la renommer en "category"
    const products = await queryTable(client, `
      SELECT
        id,
        name,
        price,
        description,
        image,
        category_id AS category,
        rating,
        stock
      FROM product
      WHERE featured = true
      ORDER BY id;
    `);
    writeFile(path.join(dataDir, 'ProductData.ts'), 'featuredProducts', products);

    // 2. Avis (reviews)
    const reviews = await queryTable(client, `
      SELECT
        id,
        author,
        avatar,
        rating,
        text,
        to_char(date, 'YYYY-MM-DD') AS date
      FROM review
      ORDER BY id;
    `);
    writeFile(path.join(dataDir, 'ReviewData.ts'), 'reviews', reviews);

    // 3. Articles de blog (blogPosts)
    const postsRaw = await queryTable(client, `
      SELECT
        bp.id,
        bp.title,
        bp.excerpt,
        to_char(bp.date, 'DD Mon YYYY HH24:MI') AS date,
        bp.image,
        bp.image_caption    AS "imageCaption",
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
    writeFile(path.join(dataDir, 'BlogPostData.ts'), 'blogPosts', postsRaw);

    // 4. Catégories
    const categories = await queryTable(client, `
        SELECT id, name
        FROM category
        ORDER BY id;
    `);
    writeFile(path.join(dataDir, 'CategoryData.ts'), 'categories', categories);
  

  } catch (err) {
    console.error('❌ Une erreur est survenue pendant la génération des fichiers :', err);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔒 Déconnexion de PostgreSQL');
  }
}

main();
