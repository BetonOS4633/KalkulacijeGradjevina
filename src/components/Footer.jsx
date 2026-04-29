import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/BetonOs.jpg"; // Provjerite je li putanja točna

export default function Footer() {
    return (
        <footer className="mt-5 py-4 bg-light border-top">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center text-md-start">
                        <img 
                            src={logo} 
                            alt="BetonOs Logo" 
                            style={{ height: '50px', width: 'auto' }} 
                            className="mb-2 mb-md-0"
                        />
                        <span className="ms-3 text-muted">
                            &copy; {new Date().getFullYear()} BetonOs - Sva prava pridržana.
                        </span>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                        <p className="mb-0 text-muted">Sustav za upravljanje nalozima</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
