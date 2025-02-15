import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./error.scss";
const Error = () => {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <img
          src={require("../../assets/images/error/error-img.png")}
          alt="error"
          className="error-img"
          width={'70%'}
          height={'50%'}
        />
        <p className="title">Oops !</p>
        <p>Page not found !</p>
        <NavLink to="/" className="custom-btn">
          Go Home
        </NavLink>
      </div>
    </Container>
  );
};

export default Error;
