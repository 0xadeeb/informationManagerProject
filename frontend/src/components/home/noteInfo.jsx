import { Modal, Button } from "react-bootstrap";
import { useToken } from "../../stores/context";
import "../../App.css";

function NoteInfo(props) {
  const [token, setToken] = useToken();

  const deleteNote = async () => {
    const data = { id: props.id },
      h = {
        Accepts: "application/json",
        Authorization: `Bearer ${token}`,
      };

    fetch(`${process.env.REACT_APP_API_SERVER}/api/delete-note`, {
      headers: h,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => console.error(error));

    window.location.reload(true);
  };

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
                  key={tag}
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
        <span className="mr-auto">
          <Button
            className="btn btn-primary mr-3"
            variant="primary"
            onClick={props.setEditModal}
          >
            Edit
          </Button>
          <Button
            className="btn btn-danger"
            variant="primary"
            onClick={deleteNote}
          >
            Delete note
          </Button>
        </span>
        <Button
          className="btn btn-warning"
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
