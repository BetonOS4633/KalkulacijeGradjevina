
import { IME_APLIKACIJE } from "../constants"
import slika from '../assets/slika1.jpg'
import { Container, Row, Col } from "react-bootstrap"

export default function Home() {
    return (
        <Container>
            <Row className="justify-content-center align-items-center mt-5">
                <Col xs={12} md={8} lg={6} className="text-center">
                    <img 
                        src={slika} 
                        className="img-fluid shadow rounded" 
                        alt="Naslovna"
                        style={{ maxHeight: '500px' }} // Ograničava visinu na velikim ekranima
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="lead m-5 text-center fw-bold">
                        Dobrodošli na {IME_APLIKACIJE}
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
