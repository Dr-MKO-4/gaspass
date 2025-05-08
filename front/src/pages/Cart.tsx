import React, { useState } from "react";
import useCartStore from "../context/cartStore";
import { Button, Card, Col, Container, Image, Row, Table, Badge, Form, Alert, Spinner } from "react-bootstrap";
import { Trash, ArrowLeft } from "react-bootstrap-icons";
import emptyCard from "../assets/empty-category.svg";
import { useNavigate } from "react-router-dom";
import sendCheckoutInfo from '../context/sendCheckoutInfo';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState(""); // Ajout de l'email
  const [status, setStatus] = useState<{
    loading: boolean;
    success: boolean;
    error: string | null;
  }>({ loading: false, success: false, error: null });

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const itemCount = cart.reduce((count, item) => count + (item.quantity || 1), 0);

  const validatePhoneNumber = (phone: string): boolean => {
    const regex = /^(?:\+?[1-9]\d{0,2})?[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/;
    return regex.test(phone);
  };

  const handleCheckout = async () => {
    if (!customerName.trim()) {
      setStatus({ loading: false, success: false, error: "Please enter your name" });
      return;
    }

    if (!validatePhoneNumber(customerPhone)) {
      setStatus({ loading: false, success: false, error: "Please enter a valid phone number (10 digits)" });
      return;
    }

    if (!customerEmail.trim()) {
      setStatus({ loading: false, success: false, error: "Please enter a valid email address" });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const result = await sendCheckoutInfo(cart, total, customerName, customerPhone, customerEmail); // Pass email here

      if (result.success) {
        setStatus({ loading: false, success: true, error: null });
        clearCart();
      } else {
        setStatus({ loading: false, success: false, error: result.message || "Failed to send order" });
      }
    } catch (error) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      });
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                  <Badge bg="secondary" className="me-2">{itemCount}</Badge> Your Cart
                </h2>
                <Button variant="outline-secondary" size="sm" onClick={() => navigate("/products")}>
                  <ArrowLeft className="me-2" /> Continue Shopping
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-5">
                  <img
                    src={emptyCard}
                    alt="Empty cart"
                    style={{ maxWidth: '300px', opacity: 0.7 }}
                    className="img-fluid mb-4"
                  />
                  <h5 className="mt-4 text-muted">Your cart is empty</h5>
                  {status.success && (
                    <Alert variant="success" className="mt-3">
                      Your order has been placed successfully! We'll contact you shortly.
                    </Alert>
                  )}
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover className="align-middle">
                      <thead>
                        <tr>
                          <th style={{ width: '60px' }}>Product</th>
                          <th>Details</th>
                          <th className="text-end" style={{ width: '100px' }}>Price</th>
                          <th style={{ width: '40px' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  rounded
                                  fluid
                                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                              ) : (
                                <div className="bg-light d-flex align-items-center justify-content-center"
                                  style={{ width: '60px', height: '60px', borderRadius: '4px' }} >
                                  <span className="text-muted">📷</span>
                                </div>
                              )}
                            </td>
                            <td>
                              <h6 className="mb-1">{item.name}</h6>
                              <small className="text-muted">Quantity: {item.quantity || 1}</small>
                            </td>
                            <td className="text-end">
                              {(item.price * (item.quantity || 1)).toLocaleString()} $
                            </td>
                            <td className="text-end">
                              <Button
                                variant="link"
                                size="sm"
                                className="text-danger"
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash size={18} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <Card className="border-0 bg-light mt-4">
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>{total.toLocaleString()} $</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Shipping</span>
                        <span className="text-success">Free</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold fs-5">
                        <span>Total</span>
                        <span>{total.toLocaleString()} $</span>
                      </div>
                    </Card.Body>
                  </Card>

                  {/* Customer Information Form */}
                  <div className="mt-4">
                    <h5 className="mb-3">Contact Information</h5>
                    
                    {status.error && (
                      <Alert variant="danger" dismissible onClose={() => setStatus({...status, error: null})}>
                        {status.error}
                      </Alert>
                    )}

                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        disabled={status.loading}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 0701234567 or +2250701234567"
                        required
                        disabled={status.loading}
                      />
                      <Form.Text className="text-muted">
                        We'll use this to contact you about your order
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={status.loading}
                      />
                      <Form.Text className="text-muted">
                        We'll use this to send a confirmation of your order
                      </Form.Text>
                    </Form.Group>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between gap-3 mt-4">
                    <Button
                      variant="outline-danger"
                      onClick={clearCart}
                      className="d-flex align-items-center"
                      disabled={status.loading}
                    >
                      <Trash className="me-2" />
                      Clear Cart
                    </Button>
                    <Button 
                      variant="danger" 
                      size="lg" 
                      className="flex-grow-1" 
                      onClick={handleCheckout}
                      disabled={status.loading || cart.length === 0}
                    >
                      {status.loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" className="me-2" />
                          Processing...
                        </>
                      ) : (
                        "Proceed to Checkout"
                      )}
                    </Button>
                  </div>

                  {status.success && (
                    <Alert variant="success" className="mt-3">
                      <Alert.Heading>Order Confirmed!</Alert.Heading>
                      <p>
                        Your order has been received successfully. We've sent a confirmation 
                        to your email and will contact you shortly.
                      </p>
                    </Alert>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
