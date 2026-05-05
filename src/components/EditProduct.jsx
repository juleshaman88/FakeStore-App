import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

const EditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    })
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await Axios.get(`https://fakestoreapi.com/products/${id}`)
                setProduct(response.data)
                setFormData({
                    title: response.data.title || '',
                    price: response.data.price?.toString() || '',
                    description: response.data.description || '',
                    category: response.data.category || '',
                    image: response.data.image || ''
                })
            } catch (fetchError) {
                console.error('Error fetching product:', fetchError)
                setError('Unable to load product. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError(null)
        setSuccess('')

        const isFormIncomplete = Object.values(formData).some((value) => value.trim() === '')
        if (isFormIncomplete) {
            setError('Please fill in all fields before saving.')
            return
        }

        setSaving(true)

        try {
            const payload = {
                ...formData,
                price: Number(formData.price)
            }

            const response = await Axios.put(`https://fakestoreapi.com/products/${id}`, payload)
            setProduct(response.data)
            setSuccess('Product updated successfully.')
        } catch (saveError) {
            console.error('Error updating product:', saveError)
            setError('Unable to save changes. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <Container className="my-4">
            <h1>Edit Product</h1>

            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="productTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter product title"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? 'Saving...' : 'Save changes'}
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </div>
            </Form>

            {product && (
                <Card className="mt-4">
                    <Card.Header>Preview</Card.Header>
                    <Card.Body>
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{ maxWidth: '150px', width: '100%', marginBottom: '1rem' }}
                            />
                        )}
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>
                            <strong>Price:</strong> ${product.price}
                        </Card.Text>
                        <Card.Text>
                            <strong>Category:</strong> {product.category}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}

export default EditProduct