import { useState, useEffect } from "react";
import { useToken } from "../../stores/context";
import { Button, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Search from "./searchBar";
import NoteForm from "./addNote";
import NoteInfo from "./noteInfo";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../../App.css";

function Home() {
  const [data, setData] = useState(null);
  const [showModal, setModal] = useState(false);
  const [showInfoModal, setInfoModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [noteInfo, setNoteInfo] = useState({});
  const [searchText, setSeacrhTet] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
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
          console.log(r);
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

  const filterNotes = async () => {
    if (filteredTags.length === 0) return;

    let h = {
      Accepts: "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      fetch(`${process.env.REACT_APP_API_SERVER}/api/get-filtered-notes`, {
        headers: h,
        method: "POST",
        body: JSON.stringify({
          tags: filteredTags,
        }),
      })
        .then((resp) => resp.json())
        .then((r) => {
          setData(r);
          console.log(r);
        })
        .catch((error) => console.log(error));
    }
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

  return !token || token == undefined || token.length <= 10 ? (
    <Redirect to="/log-in" />
  ) : data && data.notes ? (
    <div>
      <br />
      {noteInfo.note ? (
        <>
          <NoteInfo
            show={showInfoModal}
            onHide={() => closeInfoModal()}
            title={noteInfo.note[0]}
            note={noteInfo.note[1]}
            addedOn={() => noteInfo.note[2]}
            stared={noteInfo.note[3].toString()}
            id={noteInfo.note[4]}
            tags={noteInfo.tags}
            setEditModal={() => openEditModal()}
          />
          <NoteForm
            show={showEditModal}
            onHide={() => closeEditModal()}
            heading="Edit note"
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
          heading="Add a new note"
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
      <div className="row">
        <div className="col-md-1 col-sm-1 col-xs-12"></div>
        <div className="col-md-10 col-sm-10 col-xs-12">
          <Search setSeacrhTet={setSeacrhTet} searchText={searchText} />
        </div>
        <div className="col-md-1 col-sm-1 col-xs-12"></div>
      </div>
      <div className="row mb-4">
        <div className="col-md-1 col-sm-1 col-xs-12"></div>
        <div className="col-md-5 col-sm-5 col-xs-12">
          <Select
            placeholder="Filter by tags"
            options={data.tags}
            components={makeAnimated()}
            onChange={setFilteredTags}
            noOptionsMessage={() => "None of the notes have a tag to filter."}
            isMulti
            autoFocus
            isSearchable
          />
        </div>
        <div className="col-md-5 col-sm-5 col-xs-12">
          <Button className="btn btn-dark mr-4" onClick={() => filterNotes()}>
            Filter
          </Button>
          <Button className="btn btn-info" onClick={() => openModal()}>
            Add a new note
          </Button>
        </div>
        <div className="col-md-1 col-sm-1 col-xs-12"></div>
      </div>
      <div className="row">
        <div className="col-md-1 col-sm-1 col-xs-12"></div>
        <div className="col-md-10 col-sm-10 col-xs-12">
          <BootstrapTable
            classes="notesTable"
            keyField="noteId"
            data={data.notes.filter((note) => {
              return note.Title.toLowerCase().includes(searchText);
            })}
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
  );
}

export default Home;
