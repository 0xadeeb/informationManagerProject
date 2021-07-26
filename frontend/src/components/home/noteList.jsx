import { useState, useEffect } from "react";
import { useToken } from "../../stores/context";
import { Button, Table, Spinner } from "react-bootstrap";
import AddNote from "./addNote";

function Home() {
  const [data, setData] = useState(null);
  const [showModal, setModal] = useState(false);
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
        .then((msg) => setData(msg))
        .catch((error) => console.log(error));
    }
  }, [token]);

  // console.log(data);

  function closeModel() {
    setModal(false);
  }

  function openModel() {
    setModal(true);
  }

  return (
    <div>
      {data && data.notes ? (
        <div>
          <br />
          <AddNote show={showModal} onHide={() => closeModel()} />
          <br />
          <div align="center">
            <Button className="btn btn-info m-3" onClick={() => openModel()}>
              Add note
            </Button>
          </div>
          <div className="row">
            <div className="col-md-1 col-sm-1 col-xs-12"></div>
            <div className="col-md-10 col-sm-10 col-xs-12">
              <Table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.notes.map((d) => {
                    return (
                      <tr key={d[0]}>
                        <td>{d[0]}</td>
                        <td>{d[2]}</td>
                        <td>{d[3] ? "True" : "False"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
