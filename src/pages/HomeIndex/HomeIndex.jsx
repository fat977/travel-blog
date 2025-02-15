import { Button, Col, Row } from "react-bootstrap";
import "./home-index.scss";

import Categories from "./categories/Categories";
import usePosts from "../../hooks/usePosts";
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import { NavLink } from "react-router-dom";
import SkeletonImg from "../../components/Skeleton/SkeletonImg";
import { formatDate } from "date-fns";

const HomeIndex = () => {
  const tags = [
    "Adventure",
    "Food",
    "Diving",
    "Nature",
    "Vacation",
    "Beach",
    "Explore",
    "Culture",
    "Landscape",
    "City Guides",
  ];

  //posts
  const { posts, loading } = usePosts();
  // last three posts
  const latestPosts = posts.slice(-3);
  //destinations
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/fat977/posts-api/refs/heads/main/destinations.json"
        );
        // Slice the first 4 items from the fetched data
        const limitedDestinations = response.data.slice(0, 3);
        setDestinations(limitedDestinations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="index">
      <div className="home-header container p-5 my-5">
        <Row>
          <Col lg="6" md="12" xs="12">
            <div className="header-content">
              <h3>Be Ready</h3>
              <h2>Explore the world with us</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                tempora alias ipsam perspiciatis possimus debitis ut commodi,
                eum recusandae cum dicta doloremque repellendus tenetur culpa
                reprehenderit animi, quae dolorem vero.
              </p>
              <Button className="custom-btn">Explore</Button>
            </div>
          </Col>
          <Col lg="6" md="12" xs="12">
            <div className="header-img position-relative d-flex justify-content-center">
              <img
                src={require(`../../assets/images/home/header/rome.jpg`)}
                alt="rome"
                width={"70%"}
                height={"350px"}
                loading="lazy"
              />
              <img
                src={require(`../../assets/images/home/header/Japan.jpg`)}
                alt="japan"
                width={"50%"}
                height={"300px"}
                className="position-absolute"
                style={{ left: "60%", top: "25%" }}
                loading="lazy"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="home-categories container my-5">
        <h3 className="hr-lines mx-auto my-5">Top Categories</h3>
        <Categories />
      </div>
      <div className="home-body container my-5">
        <Row className="">
          <Col lg="8" md="12" xs="12">
            <h3 className="my-5 custom-border">Most visited cities</h3>
            <div className="popular-posts">
              <Row>
                {loading ? (
                  <SkeletonImg
                    rows={2}
                    columns={2}
                    baseColor="#ddd"
                    width="100%"
                    height="350px"
                  />
                ) : destinations.length > 0 ? (
                  destinations.map((dest, index) => (
                    <PostCard
                      key={dest.id}
                      item={dest}
                      link="destinations"
                      title={dest.name}
                      content={index=== 0 ? dest.description.slice(0, 40) + "...":dest.description }
                      colSizes={
                        index === 0
                          ? { lg: 12, md: 12, xs: 12 }
                          : { lg: 6, md: 6, xs: 12 }
                      }
                      imgHeight={index === 0 ? "350px" : "250px"}
                    />
                  ))
                ) : (
                  <p>No posts available</p>
                )}
              </Row>
              {destinations.length > 0 && (
                <NavLink to="/destinations" className="custom-btn">Read more</NavLink>
              )}
            </div>
          </Col>
          <Col lg="4" md="12" xs="12">
            <div className="latest-posts my-5">
              <h3 className="my-5 custom-border">Latest Posts</h3>
              {loading ? (
                <SkeletonImg
                  rows={3}
                  columns={1}
                  baseColor="#ddd"
                  width="100%"
                  height="150px"
                />
              ) : posts && posts.length > 0 ? (
                latestPosts.map((post) => (
                  <div
                    className="d-flex text-wrap gap-3 mb-4"
                    style={{ height: "150px", width: "100%" }}
                    key={post.id}
                  >
                    <img
                      src={post.image}
                      alt="latest-post"
                      width={"50%"}
                      loading="lazy"
                      style={{ borderRadius: "10px" }}
                    />
                    <div
                      className="post-details"
                      style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      <h4>{post.title}</h4>
                      <h5>by {post.userName}</h5>
                      <p className="mb-0">
                        {post.content.length > 50
                          ? post.content.slice(0, 30) + "..."
                          : post.content}
                      </p>
                      <span>
                        <small>
                          {formatDate(post.createdAt.toDate(), "MMMM d, yyyy")}
                        </small>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available</p>
              )}
            </div>
            <hr />
            <div className="tags my-5">
              <h3 className="custom-border my-5">Tags</h3>
              <div className="tags-content d-flex gap-3 flex-wrap">
                {tags.map((tag) => (
                  <span key={tag} className="border p-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default HomeIndex;
