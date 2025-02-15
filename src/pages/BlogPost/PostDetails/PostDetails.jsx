import { Button, Col, Form, Row } from "react-bootstrap";
import "./post-details.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import {
  faCalendarDays,
  faClock,
  faComment,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SocialMediaComponent from "../../../components/SocialMedia/SocialMediaComponent";
import SkeletonImg from "../../../components/Skeleton/SkeletonImg";
import { formatDate } from "../../../helpers/DateFormat";
import userImg from "../../../assets/images/user/default-user.jpg";
const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      /* setIsLoading(true); // Start loading
      try {
        const [destinationImages, postContents] = await Promise.all([
          axios.get(`https://www.freetestapi.com/api/v1/destinations/${id}`),
          axios.get(`https://www.freetestapi.com/api/v1/posts/${id}`),
        ]);

        const destination = destinationImages.data; // Assuming the response is an array of items
        const post = postContents.data;
        const comments = post.comments;
        const combineData = {
          image: `${destination.image}`,
          title: `${post.title}`,
          author: `${post.author}`,
          date: `${post.timestamp.split("T")[0]}`,
          postContent: `${post.content}`,
          likes: `${post.likes}`,
          destinationContent: `${destination.description}`,
          comment: comments,
        };
        setpost(combineData);
        console.log(combineData.comment);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      } */

      setIsLoading(true); // Start loading
      try {
        await axios
          .get(
            `https://raw.githubusercontent.com/fat977/posts-api/refs/heads/main/posts.json`
          )
          .then((res) => {
            const postData = res.data.find((item) => item.id === parseInt(id));
            setPost(postData);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <SkeletonImg
          rows={1}
          columns={1}
          baseColor="#ddd"
          width="100%"
          height="350px"
        />
      ) : (
        <div className="post-details">
          <div className="post-header">
            <img src={post.image} alt="post-img" loading="lazy" />
            <div className="header-text-details w-75">
              <h2>{post.title}</h2>
              <div className="d-flex gap-3  justify-content-lg-start ">
                <div>
                  <FontAwesomeIcon icon={faUser} /> {post.author}
                </div>
                <div>
                  <FontAwesomeIcon icon={faCalendarDays} />{" "}
                  {formatDate(post.timestamp, "MMMM d, yyyy")}
                </div>
                <div>
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {formatDate(post.timestamp, "EEEE,h:mm a")}
                </div>
              </div>
            </div>
          </div>
          <div className="post-body my-5 container">
            <Row className="g-5">
              <Col lg="9" md="12" xs="12">
                <div className="post-content my-5">
                  <p>{post.content}</p>
                </div>
                <hr />
                <div className="post-reactions my-5">
                  <Row>
                    <Col lg="6" md="12" xs="12">
                      <div className="reactions d-flex justify-content-center justify-content-lg-start  align-items-center gap-4">
                        <span>
                          21 <FontAwesomeIcon icon={faShare} />
                        </span>
                        <span>
                          {post.likes} <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <span>
                          21 <FontAwesomeIcon icon={faComment} />
                        </span>
                      </div>
                    </Col>
                    <Col lg="6" md="12" xs="12" className="mt-3 mt-lg-0 d-flex justify-content-center justify-content-lg-end">
                      <SocialMediaComponent />
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="post-comments my-5">
                  {post?.comments?.map((comment, index) => (
                    <div className="comment-wrapper" key={index}>
                      <div className="comment mb-4">
                        <div className="user-comment d-flex gap-3 mb-3">
                          <img src={userImg} alt="" loading="lazy" />
                          <div>
                            <h4>{comment.author}</h4>
                            <span><FontAwesomeIcon icon={faCalendarDays} />  April 9, 2021 at 10:28 am</span>
                            <p>{comment.text}</p>
                            <Button className="custom-btn">Reply</Button>
                          </div>
                        </div>
                        <div className="admin-comment  py-3 d-flex gap-3 ms-5">
                          <img
                            src={require(`../../../assets/images/about/team/man-1.jpg`)}
                            alt=""
                            loading="lazy"
                          />
                          <div>
                            <h4>admin name</h4>
                            <span><FontAwesomeIcon icon={faCalendarDays} />  April 9, 2021 at 10:28 am</span>
                            <p>
                              Lorem ipsum, dolor sit amet consectetur
                              adipisicing elit.
                            </p>
                            <Button className="custom-btn">Reply</Button>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <div className="leave-comment my-5">
                  <h3>Leave a comment</h3>
                  <Form>
                    <Row className="mb-3">
                      <Col>
                        <Form.Control type="text" placeholder="First name" />
                      </Col>
                      <Col>
                        <Form.Control type="email" placeholder="Email" />
                      </Col>
                    </Row>
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      rows={5}
                      className="mb-3"
                    />
                    <Button className="custom-btn">Post Comment</Button>
                  </Form>
                </div>
              </Col>
              <Col lg="3" md="12" xs="12">
                <div className="post-writer text-center my-5">
                  <img
                    src={require(`../../../assets/images/about/team/man-1.jpg`)}
                    alt=""
                    loading="lazy"
                  />
                  <div className="post-writer-info my-3">
                    <h3>{post.author}</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Vel exercitationem quod atque.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};
export default PostDetails;
