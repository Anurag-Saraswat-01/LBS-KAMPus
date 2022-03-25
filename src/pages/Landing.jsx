import Header from "../components/Header";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div>
      <Header page="landing" />
      <Container className="landing-container">
        <span className="landing-title">KAMPus</span>
        <p className="landing-text">
          A forum for you to ask, answer, and discuss
          <br />
          <span>anything</span>
          <br />
          about college
        </p>
        <p className="landing-text">Connect with your peers today!</p>
        <Link to="/signin">
          <button className="landing-signin-btn">Sign In</button>
        </Link>
        <p className="landing-signup">
          {"Not a member? "}
          <Link to="/signup">Sign Up </Link>
        </p>
        <p className="ves-bs">An LBS project created by students of VESIT:</p>
        <a className="ves-bs"
          href="https://www.linkedin.com/in/anurag-saraswat-498082214/"
          target="_blank"
          rel="noreferrer"
        >
          Anurag Saraswat
        </a>
        <a className="ves-bs"
          href="https://www.linkedin.com/in/karan-sharma-486043204/"
          target="_blank"
          rel="noreferrer"
        >
          Karan Sharma
        </a>
        <a className="ves-bs"
          href="https://www.linkedin.com/in/manigandan-kasimani-537964213/"
          target="_blank"
          rel="noreferrer"
        >
          Manigandan Kasimani
        </a>
        <a className="ves-bs"
          href="https://www.linkedin.com/in/prithvi-kumar-6a977b204/"
          target="_blank"
          rel="noreferrer"
        >
          Prithvi Kumar
        </a>
      </Container>
    </div>
  );
};

export default Landing;
