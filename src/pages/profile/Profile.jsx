import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Dropdown, NavLink, Row } from "react-bootstrap";
import "./profile.scss";
import {
  faCirclePlus,
  faEllipsisVertical,
  faEnvelope,
  faGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Settings from "./settings/Settings";
import CreatePost from "../Posts/CreatePost";
import UpdatePost from "../Posts/UpdatePost";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import usePosts from "../../hooks/usePosts";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import Swal from "sweetalert2";
import { formatDate } from "date-fns";
import SkeletonImg from "../../components/Skeleton/SkeletonImg";
import ModalComponent from "../../components/Modal/ModalComponent";
import PostCard from "../../components/PostCard/PostCard";
import {
  faLinkedin,
  faSquareFacebook,
  faSquareInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
const Profile = () => {
  //modal for settings
  const [showSettings, setShowSettings] = useState(false);

  //modal for create post
  const [showPost, setShowPost] = useState(false);

  //modal for edit post
  const [showUpdatePost, setShowUpdatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  //posts
  const { posts, loading } = usePosts();
  // delete post
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const postRef = doc(db, "posts", id); // Adjust collection name if needed
          await deleteDoc(postRef);
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the post.", "error");
          console.error("Error deleting post: ", error);
        }
      }
    });
  };

  //user
  const user = auth.currentUser;

  //filter posts
  const userPosts = posts.filter((post) => user.displayName === post.userName);
  return (
    <div className="profile container my-5 ">
      <Row className="">
        <Col lg="6" md="6" xs="12" className="px-4 px-lg-0">
          <h1>Hello</h1>
          <div className="profile-contact d-flex justify-content-between my-3">
            <h3>I'm {user.displayName}</h3>

            <div className="d-flex gap-3">
              <FontAwesomeIcon icon={faUserPlus} />
              <FontAwesomeIcon icon={faEnvelope} />
              <FontAwesomeIcon
                icon={faGear}
                onClick={() => setShowSettings(true)}
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
            impedit totam earum voluptas fuga, repellat repudiandae modi
            nesciunt eius ut molestias esse ad saepe corporis excepturi sunt
            sit. Ducimus, tenetur!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
            impedit totam earum voluptas fuga, repellat repudiandae modi
            nesciunt eius ut molestias esse ad saepe corporis excepturi sunt
            sit. Ducimus, tenetur!
          </p>
          <div className="d-flex gap-5">
            <span>250 followers</span> <span>11 following</span>
          </div>
          <ModalComponent
            show={showSettings}
            title="Settings"
            onHide={() => setShowSettings(false)}
            body={<Settings onSubmit={() => setShowSettings(false)} />}
          />
        </Col>
        <Col lg="6" md="6" xs="12" className="mt-5 px-4 px-lg-0">
          <div className="header d-flex justify-content-start justify-content-lg-center">
            <div className="image-container">
              <img
                src={require("../../assets/images/profile/profile.jpg")}
                alt="Profile"
                className="profile-image"
              />
              <div className="half-circle-container">
                <div className="half-border-circle">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faSquareFacebook}
                      className="my-5 facebook"
                    />
                  </div>
                  <div className="icon">
                    {" "}
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="my-5 twitter"
                    />
                  </div>
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="my-5 linked"
                    />
                  </div>
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faSquareInstagram}
                      className="my-5 insta"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="posts">
        <h3 className="hr-lines mx-auto my-3">Posts</h3>{" "}
        <div className="d-flex justify-content-center my-3">
          <FontAwesomeIcon
            onClick={() => setShowPost(true)}
            icon={faCirclePlus}
            size="xl"
          />
          <ModalComponent
            show={showPost}
            title="Create Post"
            onHide={() => setShowPost(false)}
            body={<CreatePost onSubmit={() => setShowPost(false)} />}
          />
        </div>
        <Row>
          {loading ? (
            <SkeletonImg
              rows={1}
              baseColor="#ddd"
              columns={1}
              width="100%"
              height="350px"
            />
          ) : userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard
                key={post.id}
                item={post}
                link="blog"
                title={post.title}
                content={post.content}
                author={post.userName}
                colSizes={{ lg: 6, md: 6, xs: 12 }}
                timestamp={formatDate(post.createdAt.toDate(), "MMMM d, yyyy")}
                custom={
                  <div className="position-absolute options pt-3">
                    <Dropdown>
                      <Dropdown.Toggle>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <NavLink
                          onClick={() => handleDelete(post.id)}
                          className="ms-3"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </NavLink>
                        <Dropdown.Item
                          onClick={() => {
                            setShowUpdatePost(true);
                            setSelectedPost(post);
                          }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} /> Edit
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <ModalComponent
                      show={showUpdatePost}
                      title="Update Post"
                      onHide={() => setShowUpdatePost(false)}
                      body={
                        selectedPost ? (
                          <UpdatePost
                            onSubmit={() => setShowUpdatePost(false)}
                            item={selectedPost}
                          />
                        ) : (
                          <SkeletonImg
                            rows={1}
                            baseColor="#ddd"
                            columns={2}
                            width="100%"
                            height="350px"
                          />
                        )
                      }
                    />
                  </div>
                }
              />
            ))
          ) : (
            <p className="text-center">No posts available</p>
          )}
        </Row>
      </div>
    </div>
  );
};
export default Profile;
