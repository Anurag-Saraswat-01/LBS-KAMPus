import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useLocation, } from "react-router-dom";

const Header = ({ page, loggedin, setLoggedin }) => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:8080";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      const response = await axios.delete(`${url}/api/users/logout`, config);
      console.log(response);
      if (response.status == 200) {
        setLoggedin({
          loginStatus: false,
          id: null,
        });
        navigate("/loggedout");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Link to={loggedin && loggedin.loginStatus ? "/" : "/home"}>
          <Navbar.Brand>KAMPus</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {page === "landing" ? (
            <Nav className="ms-auto">
              <Nav.Item>
                <Link to="/signin">
                  <Nav className="nav-link">Sign In</Nav>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/signup">
                  <Nav className="nav-link">Sign Up</Nav>
                </Link>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Item>
                <Link to="/home">
                  <Nav className="nav-link">Home</Nav>
                </Link>
              </Nav.Item>
              <Nav.Item>
                {/* will have to make an explore page ig, not sure so for now home */}
                <Link to="/home">
                  <Nav className="nav-link">Explore</Nav>
                </Link>
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
              <Link to="/ask">
                <Nav.Item className="add-post">
                  <FaPlus className="add-post-icon" />
                </Nav.Item>
              </Link>
              <Nav.Item>
                <Link to="/profile">
                  <Nav className="nav-link">Profile</Nav>
                </Link>
              </Nav.Item>
              {loggedin && loggedin.loginStatus ? (
                <Nav.Item>
                  <Link to="/loggedout" onClick={handleLogout}>
                    <Nav className="nav-link">Logout</Nav>
                  </Link>
                </Nav.Item>
              ) : null}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
