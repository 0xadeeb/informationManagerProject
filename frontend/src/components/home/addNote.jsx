import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useToken } from "../../stores/context";
import TextBox from "../text-area/textArea";
import TagsInput from "../text-area/tags";
import "../../App.css";

function NoteForm(props) {
  const [title, setTitle] = useState(props.title);
  const [note, setNote] = useState(props.note);
  const [tags, setTags] = useState(props.tags);
  const [token, setToken] = useToken();

  function submitClass() {
    let c = "btn btn-";
    return title.length === 0 || note.length === 0
      ? c + "secondary disabled mt-5"
      : c + "primary mt-5";
  }

  function updateTitle(e) {
    setTitle(e.target.value);
  }

  function updateNote(e) {
    setNote(e.target.value);
  }

  function updateTags(t) {
    setTags(t);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length === 0 || note.length === 0) return;

    const data = {
      title: title,
      note: note,
      tags: tags,
      id: props.id,
    };

    const h = {
      Accepts: "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      fetch(`${process.env.REACT_APP_API_SERVER}/api/${props.method}-note`, {
        headers: h,
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => console.error(error));
    }

    window.location.reload(true);
  };

  return (
    <Modal
      {...props}
      dialogClassName="my-modalw"
      contentClassName="my-modalh"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      scrollable={true}
      animation={props.animation}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter text-center">
          Add a new note.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <TextBox
            placeHolder={"Title"}
            value={title}
            callBack={updateTitle}
            rows={"1"}
            style={{ fontSize: 23 }}
          ></TextBox>
          <TextBox
            placeHolder={"Well go on..."}
            value={note}
            callBack={updateNote}
            rows={"12"}
          ></TextBox>

          <TagsInput
            tags={tags}
            selectedTags={(t) => updateTags(t)}
          ></TagsInput>
          <Button className={submitClass()} type="submit" variant="primary">
            Add note
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-danger"
          variant="secondary"
          onClick={props.onHide}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NoteForm;
