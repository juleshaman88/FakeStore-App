import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

const TEMP_PRODUCTS_KEY = 'temporaryProducts'
const TEMP_DELETED_KEY = 'deletedProducts'

const loadTempProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(TEMP_PRODUCTS_KEY) || '[]')
  } catch {
    return []
  }
}

const loadDeletedProducts = () => {
  try {
    return JSON.parse(localStorage.getItem(TEMP_DELETED_KEY) || '[]')
  } catch {
    return []
  }
}

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const location = useLocation();
    const message = location.state?.message || '';

    useEffect(() => {
        const fetchProducts = async () => {
            const deletedIds = loadDeletedProducts().map((value) => String(value))
            const tempProducts = loadTempProducts().filter((product) => !deletedIds.includes(String(product.id)))

            try {
                const response = await Axios.get('https://fakestoreapi.com/products')
                const visibleApiProducts = response.data.filter((product) => !deletedIds.includes(String(product.id)))
                setProducts([...tempProducts, ...visibleApiProducts])
            } catch (fetchError) {
                if (tempProducts.length) {
                    setProducts(tempProducts)
                }
                console.error('Error fetching products:', fetchError)
                setError(fetchError)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    if (error) return <p className="text-danger text-center my-5">Error loading products. Please try again later.</p>;

    return (
        <Container>
            {message && (
                <Alert variant="success" dismissible onClose={() => window.history.replaceState({}, document.title)}>
                    {message}
                </Alert>
            )}
            <h1 className="my-4">Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={6} lg={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <div className="d-flex align-items-start mb-3">
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                        />
                                    )}
                                    <div>
                                        <Card.Title className="h6 mb-1">
                                            {product.title}
                                            {(product.temporary || String(product.id).startsWith('temp-')) && (
                                                <span className="badge bg-secondary ms-2">Temporary</span>
                                            )}
                                        </Card.Title>
                                        {product.price !== undefined && (
                                            <Card.Text className="text-muted mb-0">${product.price}</Card.Text>
                                        )}
                                    </div>
                                </div>

                                <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Products