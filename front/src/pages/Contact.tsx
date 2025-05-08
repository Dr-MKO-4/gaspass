import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './contactcss.css'



const Contact: React.FC = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="mb-4 text-center">Contact Us</h2>
              <p className="text text-center mb-4">
                Do you have a question? Need assistance? Fill out the form below and our team will get back to you quickly.
              </p>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formNom">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formObjet">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject of your message" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Write your message here..." />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="danger" type="submit" size="lg">
                    Send message
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;