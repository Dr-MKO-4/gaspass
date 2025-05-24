// src/pages/ReviewDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { StarFill, ArrowLeft } from "react-bootstrap-icons";
import {reviews} from "../data/ReviewData";

const ReviewDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const review = reviews.find((r) => r.id === parseInt(id!, 10));

  if (!review) {
    return (
      <Container className="py-5 text-center">
        <h3>Review not found</h3>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button
        variant="link"
        className="mb-4 text-decoration-none"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="me-1" /> Back to Reviews
      </Button>

      <Card className="shadow-sm">
        <Card.Header className="bg-white border-bottom-0">
          <Row className="align-items-center">
            <Col xs="auto">
              <img
                src={review.avatar}
                alt={review.author}
                className="rounded-circle"
                style={{ width: 80, height: 80 }}
              />
            </Col>
            <Col>
              <h4 className="mb-1">{review.author}</h4>
              <div className="d-flex align-items-center">
                {[...Array(5)].map((_, idx) => (
                  <StarFill
                    key={idx}
                    className={
                      idx < Math.floor(review.rating!) ? "text-warning" : "text-muted"
                    }
                    style={{ width: 20, height: 20 }}
                  />
                ))}
                <Badge bg="secondary" className="ms-2">
                {!isNaN(Number(review.rating)) ? Number(review.rating).toFixed(1) : "N/A"} / 5

                </Badge>
              </div>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="border-top">
          <Card.Text style={{ lineHeight: 1.6 }}>{review.text}</Card.Text>
          <div className="text-muted mt-3">
            <small>Reviewed on: {review.date}</small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReviewDetails;
