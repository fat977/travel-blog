import { Col, Container, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SkeletonImg = ({rows,columns,baseColor,width,height})=>{
  return (
    <Container>
      <Row>
      {Array.from({ length: rows * columns }).map((_, index) => (
        <Col key={index} md={Math.floor(12 / columns)} className="mb-4">
          <Skeleton baseColor={baseColor} width={width} height={height} />
        </Col>
      ))}
    </Row>
    </Container>
  );
}
export default SkeletonImg