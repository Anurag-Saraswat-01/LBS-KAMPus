import Header from "../components/Header"
import Container from "react-bootstrap/esm/Container"

const Landing = () => {
    return (
        <div>
            <Header page="landing" />
            <Container className="landing-container">
                <span className="landing-title" >KAMPus</span>
                <p className="landing-text" >A forum for you to ask, answer, and discuss
                    <br />
                    <span>anything</span>
                    <br />
                    about college</p>
                <p className="landing-text" >Connect with your peers today!</p>
                <button className="landing-signin-btn" >Sign In</button>
                <p className="landing-signup">Not a member?
                    <a href="/"> Sign Up</a>
                </p>
            </Container>
        </div>
    )
}

export default Landing
