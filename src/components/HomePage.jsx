import { Container, Carousel, Row, Col } from 'react-bootstrap'

function HomePage () {
    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1>Welcome to FakeStore</h1>
                    <p>Your one-stop shop for all your fake product needs!</p>
                </Col>
            </Row>
            <Row> 
                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://via.placeholder.com/800x400" alt="First slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://via.placeholder.com/800x400" alt="Second slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://via.placeholder.com/800x400" alt="Third slide" />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <button className="btn btn-primary mt-4" onClick={() => window.location.href='/products'}>Shop Now</button>
        </Container>
    ); 
}

export default HomePage