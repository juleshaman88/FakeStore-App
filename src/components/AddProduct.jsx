import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const TEMP_PRODUCTS_KEY = 'temporaryProducts'

const loadTempProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(TEMP_PRODUCTS_KEY) || '[]')
  } catch {
    return []
  }
}

const saveTempProducts = (products) => {
  localStorage.setItem(TEMP_PRODUCTS_KEY, JSON.stringify(products))
}

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    confirmation: false,
  })
  const [validated, setValidated] = useState(false)
  const [savedProduct, setSavedProduct] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      image: '',
      confirmation: false,
    })
    setValidated(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false || !formData.confirmation) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    try {
      const newProduct = {
        id: `temp-${Date.now()}`,
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category,
        image: formData.image.trim(),
        temporary: true,
        createdAt: new Date().toISOString(),
      }

      const storedProducts = loadTempProducts()
      saveTempProducts([newProduct, ...storedProducts])
      setSavedProduct(newProduct)
      setSubmitted(true)
      setError('')
      resetForm()
    } catch (saveError) {
      console.error('Error saving product:', saveError)
      setError('Unable to save the temporary product. Please try again.')
      setSubmitted(false)
    }
  }

  return (
    <Container className="mt-5">
      <h2>Add Product</h2>

      {submitted && savedProduct && (
        <Alert variant="success" dismissible onClose={() => setSubmitted(false)}>
          Product "{savedProduct.title}" has been added to your catalog.
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md="6">
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
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
          <Col md="8">
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter product description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="4">
            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
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

          <Col md="4">
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option hidden value="">
                  Select a category
                </option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a category.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md="4">
            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide an image URL.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formConfirmation" className="mb-3">
          <Form.Check
            type="checkbox"
            label="I confirm that the product information is accurate."
            name="confirmation"
            checked={formData.confirmation}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            You must confirm that the product information is accurate.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Save product
        </Button>
      </Form>

      <div className="mt-4">
        <Link to="/products" className="btn btn-secondary">
          Back to Products
        </Link>
      </div>
    </Container>
  )
}

export default AddProduct;