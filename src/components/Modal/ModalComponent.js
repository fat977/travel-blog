import { Modal } from "react-bootstrap";
import "./modal.scss";
const ModalComponent = (props) => {
  return (
    <Modal {...props} centered>
      {props.title && (
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>{props.body}</Modal.Body>
    </Modal>
  );
};
export default ModalComponent;
