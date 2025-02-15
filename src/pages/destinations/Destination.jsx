import "./destination.scss";
import axios from "axios";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import SkeletonImg from "../../components/Skeleton/SkeletonImg";
import PostCard from "../../components/PostCard/PostCard";
const Destination = () => {
  const fetchDestinations = async () => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/fat977/posts-api/refs/heads/main/destinations.json"
    );
    return response.data;
  };
  const renderDestinationCard = (item) => (
    <PostCard
      key={item.id}
      item={item}
      link="destinations"
      title={item.name}
      content= {item.description}
      height={'100px'}
      colSizes={ {lg: 3, md: 6, xs: 12} }
      imgHeight={"200px"}
    />
  );
  return (
    <>
      <div className="destination">
        <div className="destination-header">
          <div className="header-text text-center">
            <h3>Destinations</h3>
            <p>Let's exploring</p>
          </div>
        </div>
        <div className="destinations-posts my-5">
          <PaginationComponent
            itemsPerPage={10}
            fetchData={fetchDestinations}
            renderItem={renderDestinationCard}
            loader={
              <SkeletonImg
               rows={3}
                baseColor="#ddd"
                columns={3}
                width="100%"
                height="350px"
              />
            }
          />
        </div>
      </div>
    </>
  );
};
export default Destination;
