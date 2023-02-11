import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote, showAlert } = props;
  const { deleteNote } = context;

  return (
    <>
      <div className=" animate-card col-lg-3 col-md-6">
        <div className="card my-3 shadow-sm">
          <div className="card-body">
            <div className="d-flex align-items-center ">
              <h5 className="card-title fw-semibold"> {note.title} </h5>
              <FiEdit className="edit mx-2" onClick={() => updateNote(note)} title="if you are update note then click this icon" />
              <FiTrash2
                className="delete mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  showAlert("Deleted note successfully ", "warning");
                }}
                title="if you are Deleted note then click this icon"
              />
            </div>
            <p className="card-text"> {note.description} </p>
            <p>
              <em>{note.tag}</em>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
