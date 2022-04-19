import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesPage = () => {
  let [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, [notes]);

  let getNotes = async () => {
    let response = await fetch("http://localhost:5000/notes/");
    let data = await response.json();
    setNotes(data);
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782;Notes</h2>
        <input
          type="text"
          placeholder="search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.body.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((note, index) => (
            <ListItem key={index} note={note} />
          ))}
      </div>
      <AddButton />
    </div>
  );
};

export default NotesPage;
