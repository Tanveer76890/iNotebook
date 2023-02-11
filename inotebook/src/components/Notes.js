import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { note, getNote, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [noteAdd, setNoteAdd] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  // updateNote method
  const updateNote = (currentNote) => {
    ref.current.click();
    setNoteAdd({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // handleclick method here
  const handleClick = (e) => {
    refClose.current.click();
    editNote(noteAdd.id, noteAdd.etitle, noteAdd.edescription, noteAdd.etag);
    console.log("Updating the note ...");
    showAlert("updated note successfully ", "success");
  };

  // inputData method here
  const inputData = (e) => {
    setNoteAdd({ ...noteAdd, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={showAlert} />

      <div className="container">
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-4">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      name="etitle"
                      value={noteAdd.etitle}
                      onChange={inputData}
                      className="form-control"
                      id="etitle"
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      name="edescription"
                      value={noteAdd.edescription}
                      onChange={inputData}
                      className="form-control"
                      id="edescription"
                      minLength={5}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      name="etag"
                      value={noteAdd.etag}
                      onChange={inputData}
                      className="form-control"
                      id="etag"
                      required
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  ref={refClose}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={noteAdd.etitle < 5 || noteAdd.edescription < 5}
                  onClick={handleClick}
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row my-4">
          <h2 className="text-center my-2">Your Notes</h2>
          <div className="container mx-2">
            {note.length === 0 && "No Notes display"}
          </div>
          {note.map((element) => {
            return (
              <Noteitem
                note={element}
                updateNote={updateNote}
                key={element._id}
                showAlert={showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
