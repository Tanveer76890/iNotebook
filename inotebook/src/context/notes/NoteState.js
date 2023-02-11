import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];

  const [note, setNote] = useState(noteInitial);

  // get all Note method
  const getNote = async () => {
    // TODO api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNote(json);
  };

  // add a note method
  const addNote = async (title, description, tag) => {
    // console.log("Adding a New Note");
    // TODO api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json);
    setNote(note.concat(json));
  };

  // delete a Note method
  const deleteNote = async (id) => {
    // TODO api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    // console.log("delete a note with id " + id);
    const newNote = note.filter((ele) => {
      return ele._id !== id;
    });
    setNote(newNote);
  };

  // Edit a Note method
  const editNote = async (id, title, description, tag) => {
    // TODO api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
            },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    
    let newNotes = JSON.parse(JSON.stringify(note));

    //  logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNote(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ note, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

// context Api ko sekhna ka ley tha ya code
//   const obj = {
//     name: "Muhammad Tanveer",
//     age: 20,
//   };

//   const [state, setState] = useState(obj);

//   const updateFun = () => {
//     setTimeout(() => {
//       setState({
//         name: "Haider ALi",
//         age: 14,
//       });
//     }, 2000);
//   };
