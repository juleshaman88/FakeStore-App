import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products')
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
                setError(error)
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
            <h1 className="my-4">Products</h1>
            <Row>
                {products.map(products => (
                    <Col key={products} action href={`/products/${products}`} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                {products.image && <img src={products.image} alt={products.title} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />}
                                {products.title}
                                {products.price && <span className="text-muted"> - ${products.price}</span>}
                                <button href={`/products/${products.id}`} className="btn btn-link p-0 ms-2">View Details</button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
           </Container>
    );
} 

export default Products