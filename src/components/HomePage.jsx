import { Container, Carousel, Row, Col } from 'react-bootstrap'

function HomePage () {
    return (
        <Container class = "container-fluid">
            <Row className="my-4">
                <Col>
                    <h1>Welcome to FakeStore</h1>
                    <p>This app will let you browse, view, edit, and delete all products through the FakeStore API.</p>
                    <button className="btn btn-primary mt-4" onClick={() => window.location.href='/products'}>Shop Now</button>                    
                </Col>
            </Row>
            <Row> 
                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://picsum.photos/1700/600?random=1" alt="First slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://picsum.photos/1700/600?random=2" alt="Second slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://picsum.photos/1700/600?random=3" alt="Third slide" />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    ); 
}

export default HomePage