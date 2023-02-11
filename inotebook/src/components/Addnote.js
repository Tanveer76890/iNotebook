import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = ({showAlert}) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [noteAdd, setNoteAdd] = useState({
    title: "",
    description: "",
    tag: "",
  });

  // handleclick method here
  const handleClick = (e) => {
    e.preventDefault();
    addNote(noteAdd.title, noteAdd.description, noteAdd.tag);
    setNoteAdd({
      title: "",
      description: "",
      tag: "",
    });
    showAlert("Added note successfully ", "success");
  };

  // inputData method here
  const inputData = (e) => {
    setNoteAdd({ ...noteAdd, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="bg-img">
      <div className=" container my-4 pb-2">
        <h1 className="text-uppercase font-monospace text-center my-1 text-black">
          Add a Note
        </h1>
        <div className="container w-75  mx-auto">
          <form className="my-4">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                onChange={inputData}
                value={noteAdd.title}
                className="form-control"
                id="title"
                minLength={5}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                name="description"
                onChange={inputData}
                value={noteAdd.description}
                className="form-control"
                id="description"
                minLength={5}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                name="tag"
                onChange={inputData}
                value={noteAdd.tag}
                className="form-control"
                id="tag"
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleClick}
              className="btn btn-info"
              disabled={noteAdd.title.length < 5 || noteAdd.description.length < 5}
              title="Add Note" >
              Add Note
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default Addnote;
