import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/esm/Container"
import Nav from "react-bootstrap/Nav"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import { FaSearch, FaPlus } from "react-icons/fa"

const Header = ({ page }) => {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand href="/">KAMPus</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {page === 'landing' ?
                        <Nav className="ms-auto">
                            <Nav.Item>
                                <Nav.Link href="/">Sign In</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/">Sign Up</Nav.Link>
                            </Nav.Item>
                        </Nav> :
                        <Nav className="ms-auto">
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/">Explore</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <InputGroup className="search-bar">
                                    <FormControl
                                        placeholder="Search posts"
                                        aria-label="search-bar"
                                        aria-describedby="search-icon"
                                    />
                                    <InputGroup.Text id="search-icon">
                                        <FaSearch />
                                    </InputGroup.Text>
                                </InputGroup>
                            </Nav.Item>
                            <Nav.Item className="add-post">
                                    <FaPlus className="add-post-icon" />
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/">Profile</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
