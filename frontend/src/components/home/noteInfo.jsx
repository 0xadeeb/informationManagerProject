import { Modal, Button } from "react-bootstrap";
import "../../App.css";

function NoteInfo(props) {
  return (
    <Modal
      {...props}
      dialogClassName="my-modalw"
      contentClassName="my-modalh"
      aria-labelledby="contained-modal-title-vcenter"
      scrollable={true}
      white-space="pre-line"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          <h3 className="m-2">{props.title}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="m-2">
          <h5>Last Modified on:</h5>
          {props.addedOn}

          <div className="m2">
            {props.tags.map((tag) => {
              return (
                <span
                  className="badge bg-secondary larger-badge m-1"
                  style={{ color: "white" }}
                >
                  #{tag}
                </span>
              );
            })}
          </div>
          <br />
          {props.note}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-primary mr-auto" variant="primary">
          Edit
        </Button>
        <Button
          className="btn btn-danger"
          variant="secondary"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NoteInfo;
