import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, InputGroup } from "react-bootstrap";
import "./search-bar.scss";
import { useSearchContext } from "../../context/SearchBarContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const SearchBar = () => {
  const { setIsOpenSearch } = useSearchContext();
  const [searchQuery, setSearchQuery] = useState("");

  //destinations
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/fat977/posts-api/refs/heads/main/destinations.json"
        );
        setDestinations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDestinations();
  }, []);
  console.log(destinations);

  //posts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/fat977/posts-api/refs/heads/main/posts.json"
        );
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter both posts and destinations
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.content.toLowerCase().includes(searchQuery)
  );

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchQuery) ||
      destination.description.toLowerCase().includes(searchQuery)
  );
  return (
    <>
      <div className="search d-flex align-items-center  bg-light">
        <InputGroup className="container">
          <Form.Control
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            aria-describedby="basic-addon2"
          />
          <InputGroup.Text id="basic-addon2">
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => setIsOpenSearch(false)}
            />
          </InputGroup.Text>
        </InputGroup>
      </div>
      {/* Display Results */}
      <div className="d-flex justify-content-center">
      {searchQuery && (
        <div className="results border shadow container mx-auto w-100 p-5">
          <div className="">
            {searchQuery && filteredPosts.length > 0
              ? filteredPosts.map((post) => (
                  <div key={post.id} style={{ marginBottom: "20px" }}>
                   <h3><NavLink onClick={()=>setIsOpenSearch(false)} to={`/blog/${post.id}`}>{post.title}</NavLink></h3>
                    <p>{post.content.slice(0, 100)}...</p>
                  </div>
                ))
              : searchQuery && <p>No posts found.</p>}
          </div>

          <div className="">
            {searchQuery && filteredDestinations.length > 0
              ? filteredDestinations.map((destination) => (
                  <div key={destination.id} style={{ marginBottom: "20px" }}>
                    <h3><NavLink onClick={()=>setIsOpenSearch()} to={`/destinations/${destination.id}`}>{destination.name}</NavLink></h3>
                    <p>{destination.description.slice(0, 100)}...</p>
                  </div>
                ))
              : searchQuery && <p>No destinations found.</p>}
          </div>
        </div>
      )}
      </div>
    </>
  );
};
export default SearchBar;
