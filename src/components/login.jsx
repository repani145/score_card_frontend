// Login.js
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../customHooks/user_auth';
import Navbar from './nav';
// import { baseUrl } from '../../urls/urls';

const baseUrl = 'http://127.0.0.1:8000/'

function Login() {
    const { login  } = useAuth(); // Use the custom hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const loginUrl = baseUrl+'auth/login'
      try {
        const response = await axios.post(loginUrl, {
          email,
          password,
        });
        if (response.data.success === 1) {
          // Assuming your API returns user data and accessToken on success
          login({"data":response.data.data, "accessToken":response.data.accessToken}); // Adjust based on your API response structure
          setMessage('Login successful!');
          navigate('/dashboard')
        } else {
          setMessage(response.data.message);
        }
      } catch (error) {
        setMessage('Login failed. Please try again.');
      }
    };
  
    return (
      <>
        {/* <LandNavbar /> */}
        <Navbar/>
        <br/>
        <Container className="d-flex align-items-center justify-content-center vh-95">
          <Row className="w-100">
            <Col md={6} lg={4} className="mx-auto">
              <h2 className="text-center mb-4">Login</h2>
              {message && <div className="alert alert-danger">{message}</div>} {/* Display error/success messages */}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email : admin@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
  
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password : Admin@123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
  
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
  
                <div className="text-center mt-3">
                  <Link to="/signup" className="text-decoration-none">
                    Don’t have an account? Sign Up
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        {/* <Footor/> */}
      </>
    );
  }
  
  export default Login;