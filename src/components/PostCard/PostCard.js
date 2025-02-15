import React from "react";
import { Card, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import './post-card.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser } from "@fortawesome/free-regular-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
const PostCard = ({
  colSizes = { lg: 4, md: 6, xs: 12 },
  item,
  link,
  author,
  title,
  timestamp,
  content,
  custom,
  imgHeight="250px"
}) => {
  return (
    <Col lg={colSizes.lg} md={colSizes.md} xs={colSizes.xs} key={item.id} className="mb-4">
      <Card className="mb-4" /* style={{ height: "450px" }} */>
        <Card.Img
          variant="top"
          src={item.image}
          alt={item.title}
          style={{ height: imgHeight, objectFit: "cover" }} // Dynamic height and cropping
          loading="lazy"
        />
        {custom && custom}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {(author || timestamp) && (
            <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
              <div><FontAwesomeIcon icon={faUser} /> {author}</div>
              <div> <FontAwesomeIcon icon={faCalendarDays} />  {timestamp}</div>
            </Card.Subtitle>
          )}
          <Card.Text>
            {content.length > 40 ? content.slice(0, 50) + "..." : content}
          </Card.Text>
          <NavLink className="custom-btn w-100 d-block text-center" to={`/${link}/${item.id}`}>Read More <FontAwesomeIcon icon={faAnglesRight} /></NavLink>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PostCard;
