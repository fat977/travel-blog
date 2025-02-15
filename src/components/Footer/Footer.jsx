import {
  Col,
  Container,
  Form,
  InputGroup,
  NavLink,
  Row,
} from "react-bootstrap";
import logo from '../../assets/images/logo/travel-bag.png';
import "./footer.scss";
import SocialMediaComponent from "../SocialMedia/SocialMediaComponent";
const Footer = () => {
  return (
    <div className="footer p-5">
      <Container>
        <Row>
          <Col lg="4" sm="12" md="12"  className="my-3 my-lg-0">
            <div className="logo d-flex gap-2 align-items-center">
              <img
                src={logo}
                alt="logo"
                width={"18%"}
                height={"18%"}
                loading="lazy"
              />
              <h3 className="mb-0">Travel</h3>
            </div>
            <div className="details my-3">
              <p>
                <span className="fw-bold">Address :</span> Egypt , Mansoura
              </p>
              <p>
                <span className="fw-bold">Phone :</span> (+20) 01153280679
              </p>
              <p>
                <span className="fw-bold">Email :</span>{" "}
                fatma.a.elsaadawy@gmail.com
              </p>
            </div>
            <SocialMediaComponent />
          </Col>
          <Col lg="4" sm="12" md="12" className="my-3 my-lg-0">
            <h3>Help Center</h3>
            <ul >
              <li>
                <NavLink>About</NavLink>
              </li>
              <li>
                <NavLink>Contact</NavLink>
              </li>
              <li>
                <NavLink>Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink>Term & Conditions</NavLink>
              </li>
            </ul>
          </Col>
          <Col lg="4" sm="12" md="12" className="my-3 my-lg-0">
            <h3>Subscribe Newsletter</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
              dicta quo officiis nisi quasi voluptates sed praesentium{" "}
            </p>
            <InputGroup>
              <Form.Control
              type="email"
                placeholder="Enter Email..."
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">Send</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;
