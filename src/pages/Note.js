import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";

const Note = ({ match, history }) => {
  let noteId = match.params.id;
  let [note, setNote] = useState(null);
  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if (noteId == "new") return;
    let response = await fetch(`http://localhost:5000/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date(), crossout: 0 }),
    });
  };

  let updateNote = async () => {
    let crossOutState = note.crossout;
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        updated: new Date(),
        crossout: crossOutState,
      }),
    });
  };

  let crossOutNote = async () => {
    let crossOutState = 1;
    if (note.crossout === 1) {
      crossOutState = 0;
    }
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        updated: new Date(),
        crossout: crossOutState,
      }),
    });
    history.push("/");
  };

  let deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(note),
    });
    history.push("/");
  };

  let handleSubmit = () => {
    if (noteId != "new" && !note.body) {
      deleteNote();
    } else if (noteId != "new") {
      updateNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    }
    history.push("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== "new" ? (
          <>
            <button onClick={crossOutNote}>CrossOut</button>
            <button onClick={deleteNote}>Delete</button>
          </>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default Note;
