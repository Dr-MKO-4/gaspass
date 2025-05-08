import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { EyeFill, StarFill } from 'react-bootstrap-icons';
import emptyCategory from '../assets/empty-category.svg'; 

// Type pour les produits
interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  discount?: number;
}

// Données des produits par catégorie
const productsByCategory: Record<string, Product[]> = {
  electronics: [
    {
      id: 1,
      name: "Casque Bluetooth HD",
      category: "electronics",
      description: "Casque sans fil avec réduction de bruit et autonomie de 30h",
      price: 25000,
      image: "https://via.placeholder.com/300x200?text=Casque+Bluetooth",
      rating: 4.5,
      discount: 10
    },
    {
      id: 2,
      name: "Chargeur Rapide 65W",
      category: "electronics",
      description: "Chargeur ultra rapide compatible avec la plupart des appareils",
      price: 12000,
      image: "https://via.placeholder.com/300x200?text=Chargeur+Rapide",
      rating: 4.2
    }
  ],
  fashion: [
    {
      id: 3,
      name: "T-shirt Premium",
      category: "fashion",
      description: "T-shirt 100% coton avec design exclusif",
      price: 8000,
      image: "https://via.placeholder.com/300x200?text=T-shirt+Premium",
      rating: 4.7,
      discount: 15
    },
    {
      id: 4,
      name: "Montre Élégante",
      category: "fashion",
      description: "Montre quartz avec bracelet en cuir véritable",
      price: 35000,
      image: "https://via.placeholder.com/300x200?text=Montre+Élégante",
      rating: 4.9
    }
  ],
  beauty: [
    {
      id: 5,
      name: "Crème Hydratante Bio",
      category: "beauty",
      description: "Crème naturelle pour une peau hydratée 24h",
      price: 7500,
      image: "https://via.placeholder.com/300x200?text=Crème+Hydratante",
      rating: 4.3,
      discount: 20
    },
    {
      id: 6,
      name: "Parfum Signature",
      category: "beauty",
      description: "Eau de parfum avec notes florales et boisées",
      price: 18000,
      image: "https://via.placeholder.com/300x200?text=Parfum+Signature",
      rating: 4.8
    }
  ]
};

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const rawId = id?.toLowerCase() || "";
  const products = productsByCategory[rawId as keyof typeof productsByCategory] || [];
  const categoryName = rawId.charAt(0).toUpperCase() + rawId.slice(1);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">
          Catégorie: {categoryName}
        </h1>
        <p className="lead text">
          Découvrez notre sélection exclusive de produits {categoryName}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-5">
          <img
            src={emptyCategory}
            alt="Catégorie vide"
            style={{ maxWidth: '300px', opacity: 0.7 }}
            className="img-fluid mb-4"
          />
          <h4 className="text">Aucun produit disponible dans cette catégorie</h4>
          <Button variant="outline-danger" className="mt-3" href="/categories">
            Voir toutes les catégories
          </Button>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                {product.discount && (
                  <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                    -{product.discount}%
                  </Badge>
                )}
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{product.name}</Card.Title>
                    {product.rating && (
                      <Badge bg="warning" text="dark">
                        <StarFill className="me-1" />
                        {product.rating}
                      </Badge>
                    )}
                  </div>
                  <Card.Text className="text-muted small mb-3">
                    {product.description}
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0 text-danger">
                        {product.price.toLocaleString()} $
                      </h5>
                      {product.discount && (
                        <small className="text-decoration-line-through text-muted">
                          {(product.price * (1 + product.discount / 100)).toLocaleString()} $
                        </small>
                      )}
                    </div>
                    <Button variant="danger" className="w-100">
                      <EyeFill className="me-2" />
                      Voir le produit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Category;
