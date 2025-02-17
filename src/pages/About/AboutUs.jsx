import { Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./about.scss";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { team } from "./data/Team";
import SocialMediaComponent from "../../components/SocialMedia/SocialMediaComponent";
import bodyImage from "../../assets/images/about/about-body.png";
import { testimonials } from "./data/testimonials";
const About = () => {
  return (
    <div className="about">
      <div className="about-header">
        <h3 className="header-text">About Us</h3>
      </div>
      <div className="about-details container my-5">
        <Row>
          <Col lg="6" md="6" sm="12">
            <img src={bodyImage} alt="contact" width={"100%"} loading="lazy" />
          </Col>
          <Col
            lg="6"
            md="6"
            sm="12"
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <h3>About Blog</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,
              accusamus harum? Facilis deserunt sequi illo quaerat voluptatibus
              enim veniam adipisci minus deleniti vitae numquam, voluptatem
              totam alias distinctio iure! Alias.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,
              accusamus harum? Facilis deserunt sequi illo quaerat voluptatibus
              enim veniam adipisci minus deleniti vitae numquam, voluptatem
              totam alias distinctio iure! Alias.
            </p>
          </Col>
        </Row>
      </div>
      <div className="team container my-5">
        <h3 className="hr-lines my-5">Team</h3>
        <Row>
          {team.map((person, index) => (
            <Col lg="3" md="6" xs="12" className="my-5 my-lg-0" key={index}>
              <img
                src={person.image}
                alt={person.name}
                height={"400px"}
                width={"100%"}
                loading="lazy"
              />
              <div className="team-details bg-light shadow-sm py-4 text-center rounded">
                <h4>{person.name}</h4>
                <SocialMediaComponent classname={"justify-content-center"} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div
        className="testimonials container my-5 p-4"
        style={{ margin: "0 auto" }}
      >
        <h3 className="hr-lines  my-5">Testimonials</h3>
       
          <Swiper
            spaceBetween={50} // Space between slides
            slidesPerView={1} // Number of slides to show at once
            freeMode={true}
            navigation={true}
            modules={[FreeMode, Pagination, Navigation]}
          >
            {testimonials.map((user, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-content text-center align-tems-center" style={{ marginTop: "8%" }}>
                  <img
                    src={user.image}
                    alt={user.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    loading="lazy"
                  />
                  <p className="my-3">
                    <FontAwesomeIcon icon={faQuoteLeft} className="me-3" />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Saepe nisi facere tenetur sunt deserunt iste libero in animi
                    voluptates quasi beatae omnis, consectetur placeat maiores
                    eius quo provident nobis cupiditate.
                    <FontAwesomeIcon icon={faQuoteRight} className="ms-3"/>
                  </p>
                  <p>
                    -
                    <span className="fst-italic text-secondary">
                      {user.name}
                    </span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
           
          </Swiper>
       
      </div>
    </div>
  );
};
export default About;
