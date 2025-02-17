import { Col, Form, Row } from "react-bootstrap";
import MyMap from "./Map/Map";
import "./contact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faLocationPin,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import bodyImage from '../../assets/images/contact/contact-body.png'
const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-header">
        <h3 className="header-text">Contact Us</h3>
      </div>
      <div className="contact-form container my-5">
        <Row>
          <Col
            lg="5"
            md="6"
            sm="12"
            className="d-flex flex-column justify-content-center  align-items-center"
          >
            <h3 className="text-center my-2">Get in touch</h3>

            <img
              src={bodyImage}
              alt="contact"
              width={"100%"}
              loading="lazy"
            />
          </Col>
          <Col lg="7" md="6" sm="12">
            <Form className="shadow py-4 px-3 p-lg-5">
              <Row className="mb-3">
                <Form.Group as={Col} md="6" className="mb-3 mb-lg-0">
                  <Form.Label>First name</Form.Label>
                  <Form.Control required type="text" placeholder="First name" />
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-3 mb-lg-0">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control required type="text" placeholder="Last name" />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group className="mb3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Leave a comment here"
                  rows={5}
                />
              </Form.Group>
              <button className="my-3 d-block w-100 custom-btn">Send Message</button>
            </Form>
          </Col>
        </Row>
      </div>
      <div className="contact-location my-5">
        <MyMap />
      </div>
      <div className="contact-details container my-5">
        <Row>
            <Col lg="3" md="6" xs="12" className="text-center">
            <FontAwesomeIcon icon={faPhone} />
            <p>(+20) 01153280679</p>
            </Col>
            <Col lg="3" md="6" xs="12" className="text-center">
            <FontAwesomeIcon icon={faLocationPin} />
          <p>Egypt , Mansoura</p>
            </Col>
            <Col lg="3" md="6" xs="12" className="text-center">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>fatma.a.elsaadawy@gmail.com</p>
            </Col>
            <Col lg="3" md="6" xs="12" className="text-center">
            <FontAwesomeIcon icon={faGlobe} />
            <p>website.com</p>
            </Col>
        </Row>
      </div>
    </div>
  );
};
export default Contact;
