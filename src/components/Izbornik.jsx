
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { RouteNames } from "../constants";
import { useNavigate } from "react-router-dom";
import logoBetonOs from "../assets/BetonOs.jpg"; // Uvoz slike

export default function Izbornik() {
 
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* Zamjena teksta logotipom */}
                <Navbar.Brand 
                    onClick={() => navigate(RouteNames.HOME)} 
                    style={{ cursor: 'pointer' }}
                    className="p-0"
                >
                    <img
                        src={logoBetonOs}
                        alt="BetonOS Logo"
                        style={{ height: '40px', width: 'auto' }}
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                            onClick={() => navigate(RouteNames.HOME)}
                        >
                            Početna
                        </Nav.Link>

                        <NavDropdown title="Unos podataka" id="basic-nav-dropdown">
                            <NavDropdown.Item 
                                onClick={() => navigate(RouteNames.STROJEVI)}
                            >
                                Strojevi
                            </NavDropdown.Item>

                            <NavDropdown.Item
                                onClick={() => navigate(RouteNames.RADNICI)}
                            >
                                Radnici
                            </NavDropdown.Item>
                          
                            <NavDropdown.Item
                                onClick={() => navigate(RouteNames.PODUZECE)}
                            >
                                Poduzeće
                            </NavDropdown.Item>
                          
                            <NavDropdown.Item
                                onClick={() => navigate(RouteNames.GRADILISTE)}
                            >
                                Gradilište
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item
                                onClick={() => navigate(RouteNames.NALOG)}
                            >
                                Nalozi
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
