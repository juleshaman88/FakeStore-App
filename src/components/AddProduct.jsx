import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormModal from './FormModal';
import OffCanvas from './OffCanvas';
import axios from 'axios';

const UserForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    food: '',
    communication: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
        e.stopPropagation();
    } else {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', formData);
      console.log(response.data);
      setUser(response.data);
      setSubmitted(true);
      setShowModal(true);
      setError(null);
    } catch (err) {
      setError(`Error submitting the form. Please try again: ${err.message}`);
      setSubmitted(false);
    }
    setValidated(true);

  }

  }

  return (
    <Container className="mt-5">
      <h2>Create User</h2>

      <FormModal user={user} submitted={submitted} show={showModal} handleClose={handleCloseModal} />

      {submitted && <Alert variant="success" dismissible>{user.name} created successfully!</Alert>}
      {error && <Alert variant="danger" dismissible>{error}</Alert>}

      {submitted && <Alert variant="success" dismissible>{user.name} created successfully!</Alert>}
      {error && <Alert variant="danger" dismissible>{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="5">
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New Product"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a product title.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
         </Row> 

        <Row>
          <Col md="7">
            <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3" style={{ marginTop: '12px' }}>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
         </Row> 

        <Row>
          <Col md="5">
            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a price.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md="5">
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a category.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
        <OffCanvas />  
    </Container>
  );
};

export default UserForm;