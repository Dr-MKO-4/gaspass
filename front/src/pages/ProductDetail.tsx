import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col, Badge } from "react-bootstrap";
import { StarFill, CartPlus, ArrowLeft } from "react-bootstrap-icons";
import useCartStore from "../context/cartStore";
import {featuredProducts} from "../data/ProductData";



const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const product = featuredProducts.find((p) => p.id === Number(id)); // correction ici

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Produit non trouvé</h2>
        <Button variant="danger" onClick={() => navigate(-1)}>
          Retour
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
        stock: product.stock,
        description: product.description,
      });
    }
  };

  return (
    <Container className="py-5">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="me-1" /> Retour
      </Button>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.name}
              className="p-4"
            />
          </Card>
        </Col>
        <Col md={6}>
          <Badge bg="light" text="dark" className="mb-3">
            {product.category}
          </Badge>
          <h1>{product.name}</h1>

          {product.rating && (
            <div className="d-flex align-items-center mb-3">
              <StarFill className="text-warning me-1" />
              <span>{product.rating}</span>
            </div>
          )}

          <h3 className="mb-4">{product.price.toLocaleString()} $</h3>

          <div className="mb-4">
            <h5>Description</h5>
            <p>{product.description}</p>
          </div>

          <div className="d-flex align-items-center mb-4">
            <h5 className="mb-0 me-3">Disponibilité :</h5>
            {product.stock > 0 ? (
              <Badge bg="success">En stock ({product.stock} disponibles)</Badge>
            ) : (
              <Badge bg="danger">Rupture de stock</Badge>
            )}
          </div>

          <Button
            variant={product.stock > 0 ? "danger" : "secondary"}
            size="lg"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-100"
          >
            <CartPlus className="me-2" size={20} />
            {product.stock > 0 ? "Ajouter au panier" : "Indisponible"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
