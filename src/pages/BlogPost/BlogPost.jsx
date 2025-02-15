import axios from "axios";
import "./blog-post.scss";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import PostCard from "../../components/PostCard/PostCard";
import SkeletonImg from "../../components/Skeleton/SkeletonImg";
import { formatDate } from "date-fns";
const BlogPost = () => {
  const fetchPosts = async () => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/fat977/posts-api/refs/heads/main/posts.json"
    );
    return response.data;
  };
  const renderPostCard = (item) => (
    <PostCard
      key={item.id}
      item={item}
      link="blog"
      title={item.title}
      author={item.author}
      timestamp={ formatDate(item.timestamp, 'MMMM d, yyyy')}
      content={item.content}
      colSizes={ {lg: 4, md: 6, xs: 12} }
      imgHeight={"200px"}
    />
  );
  return (
    <div className="blog">
      <div className="blog-header">
        <div className="header-text text-center">
          <h3>Blog</h3>
          <p>Travel Blog Posts</p>
        </div>
      </div>
      <div className="blog-posts my-5">
        <PaginationComponent
          itemsPerPage={6}
          fetchData={fetchPosts}
          renderItem={renderPostCard}
          loader={
            <SkeletonImg
             rows={2}
             columns={3}
              baseColor="#ddd"
              width="100%"
              height="350px"
            />
          }
        />
      </div>
    </div>
  );
};
export default BlogPost;
