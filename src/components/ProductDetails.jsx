import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Axios from 'axios'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const TEMP_PRODUCTS_KEY = 'temporaryProducts'
const TEMP_DELETED_KEY = 'deletedProducts'

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

const loadDeletedProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(TEMP_DELETED_KEY) || '[]')
  } catch {
    return []
  }
}

const saveDeletedProducts = (deletedIds) => {
  localStorage.setItem(TEMP_DELETED_KEY, JSON.stringify(deletedIds))
}

function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            const deletedIds = loadDeletedProducts().map((value) => String(value))
            if (deletedIds.includes(String(id))) {
                setError('Product not found.')
                setLoading(false)
                return
            }

            try {
                const response = await Axios.get(`https://fakestoreapi.com/products/${id}`)
                setProduct(response.data)
            } catch (fetchError) {
                const storedProducts = loadTempProducts()
                const tempProduct = storedProducts.find((item) => String(item.id) === String(id))
                if (tempProduct) {
                    setProduct(tempProduct)
                } else {
                    console.error('Error fetching product:', fetchError)
                    setError('Unable to load product. Please try again later.')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    if (error) {
        return <Alert variant="danger" className="my-5 text-center">{error}</Alert>
    }

    if (!product) {
        return <p className="text-center my-5">Product not found.</p>
    }

    const handleDelete = () => {
        if (!window.confirm('Delete this product from the catalog?')) {
            return
        }

        setDeleting(true)
        const deletedIds = loadDeletedProducts().map((value) => String(value))

        if (String(product.id).startsWith('temp-') || product.temporary) {
            const remaining = loadTempProducts().filter((item) => String(item.id) !== String(product.id))
            saveTempProducts(remaining)
        } else if (!deletedIds.includes(String(product.id))) {
            saveDeletedProducts([...deletedIds, String(product.id)])
        }

        navigate('/products')
    }

    return (
        <Container className="my-4">
            <Card>
                {product.image && (
                    <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.title}
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                )}
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>
                        <strong>Price:</strong> ${product.price}
                    </Card.Text>
                    <Card.Text>
                        <strong>Category:</strong> {product.category}
                    </Card.Text>
                    <div className="d-flex gap-2">
                        <Link to={`/products/${product.id}/edit`} className="btn btn-primary">
                            Edit Product
                        </Link>
                        <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                            {deleting ? 'Deleting...' : 'Delete Product'}
                        </Button>
                        <Button variant="btn btn-secondary">
                            Add to Cart
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ProductDetails