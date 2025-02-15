import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SkeletonImg from "../../../components/Skeleton/SkeletonImg";
const DesDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        await axios
          .get(
            `https://raw.githubusercontent.com/fat977/posts-api/refs/heads/main/destinations.json`
          )
          .then((res) => {
            const destinationData = res.data.find(item => item.id === parseInt(id));
            console.log(destinationData)
            setDestination(destinationData);
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
        <div className="destination-details">
          <div className="dest-details-header">
            <img src={destination.image} alt="destination-img" loading="lazy" />
          </div>
          <div className="destination-body my-5 container">
            <Row className="g-5">
              <Col lg="9" md="12" xs="12">
                <div className="destination-content my-5">
                <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <p>
                    {destination.country} | {destination.continent}
                  </p>
                  <p>
                    {destination.language} | {destination.currency}
                  </p>
                  <hr />
                  <div className="best-time">
                    <h4>Best time to visit</h4>
                    <p>{destination.best_time_to_visit}</p>
                  </div>
                  <hr />
                  <div className="attractions">
                    <h4>Top attraction places</h4>
                    {destination.top_attractions?.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                  <hr />
                  <div className="dishes">
                    <h4>Local Dishes</h4>
                    {destination.local_dishes?.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                  <hr />
                  <div className="activities">
                    <h4>Activities</h4>
                    {destination.activities?.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              </Col>
              <Col lg="3" md="12" xs="12">
                <div className="destination-writer text-center my-5">
                  <img
                    src={require(`../../../assets/images/about/team/man-1.jpg`)}
                    alt=""
                    loading="lazy"
                  />
                  <div className="destination-writer-info my-3">
                    <h3>Admin</h3>
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
export default DesDetails;
