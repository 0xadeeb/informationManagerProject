import { useState, useEffect } from "react";
import { useToken } from "../../stores/context";
import { Button, Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import NoteForm from "./addNote";
import NoteInfo from "./noteInfo";
import "../../App.css";

function Home() {
  const [data, setData] = useState(null);
  const [showModal, setModal] = useState(false);
  const [showInfoModal, setInfoModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [noteInfo, setNoteInfo] = useState({});
  const [token, setToken] = useToken();

  useEffect(() => {
    let h = {
      Accepts: "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      fetch(`${process.env.REACT_APP_API_SERVER}/api/getallnotes`, {
        headers: h,
      })
        .then((resp) => resp.json())
        .then((r) => {
          setData(r);
        })
        .catch((error) => console.log(error));
    }
  }, [token]);

  // console.log(data);

  function closeModal() {
    setModal(false);
  }

  function closeInfoModal() {
    setNoteInfo({});
    setInfoModal(false);
  }

  function closeEditModal() {
    setNoteInfo({});
    setEditModal(false);
  }

  function openModal() {
    setModal(true);
  }

  function openEditModal() {
    setInfoModal(false);
    setEditModal(true);
  }

  const fetchNotesInfo = async (id) => {
    const data = {
        id: id,
      },
      h = {
        Accepts: "application/json",
        Authorization: `Bearer ${token}`,
      };

    fetch(`${process.env.REACT_APP_API_SERVER}/api/get-notes-info`, {
      headers: h,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setNoteInfo(resp);
        console.log(resp);
      })
      .catch((error) => console.log(error));
  };

  const col = [
    { dataField: "Sno", text: "#" },
    { dataField: "Title", text: "Title" },
    { dataField: "Started", text: "s" },
  ];

  const rowData = {
    onClick: (e, row) => {
      console.log(row);
      fetchNotesInfo(row.noteId);
      setInfoModal(true);
    },
  };

  return (
    <div>
      {data && data.notes ? (
        <div>
          <br />
          {noteInfo.note ? (
            <>
              <NoteInfo
                show={showInfoModal}
                onHide={() => closeInfoModal()}
                title={noteInfo.note[0]}
                note={noteInfo.note[1]}
                addedOn={noteInfo.note[2]}
                stared={noteInfo.note[3].toString()}
                tags={noteInfo.tags}
                setEditModal={() => openEditModal()}
              />
              <NoteForm
                show={showEditModal}
                onHide={() => closeEditModal()}
                title={noteInfo.note[0]}
                note={noteInfo.note[1]}
                stared={noteInfo.note[3].toString()}
                id={noteInfo.note[4]}
                tags={noteInfo.tags}
                method="edit"
                animation={false}
              />
            </>
          ) : (
            <NoteForm
              show={showModal}
              onHide={() => closeModal()}
              title=""
              note=""
              stared=""
              id=""
              tags={[]}
              method="add"
              animation={true}
            />
          )}

          <br />
          <div align="center">
            <Button className="btn btn-info m-3" onClick={() => openModal()}>
              Add note
            </Button>
          </div>
          <div className="row">
            <div className="col-md-1 col-sm-1 col-xs-12"></div>
            <div className="col-md-10 col-sm-10 col-xs-12">
              <BootstrapTable
                classes="notesTable"
                keyField="noteId"
                data={data.notes}
                columns={col}
                pagination={paginationFactory()}
                rowEvents={rowData}
                striped
                bordered
                hover
              ></BootstrapTable>
            </div>
            <div className="col-md-1 col-sm-1 col-xs-12"></div>
          </div>
        </div>
      ) : (
        <div>
          <Spinner className="center" animation="grow" variant="primary" />
          <Spinner className="center" animation="grow" variant="secondary" />
          <Spinner className="center" animation="grow" variant="primary" />
          <Spinner className="center" animation="grow" variant="secondary" />
        </div>
      )}
    </div>
  );
}

export default Home;
