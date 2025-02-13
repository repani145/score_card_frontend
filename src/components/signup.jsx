import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Col, Row } from "react-bootstrap";
import Navbar from "./nav";

const baseUrl = "";

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/create-user`, formData);
      if (response.data.success) {
        setMessage("Signup successful!");
        setIsError(false);
      } else {
        setMessage(response.data.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsError(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="signup-container mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            {message && <Alert variant={isError ? "danger" : "success"}>{message}</Alert>}
            <h3>Signup Now</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="full_name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="mobile">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Signup
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
