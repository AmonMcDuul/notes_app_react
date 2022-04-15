import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddNewNoteButton } from "../assets/file.svg";

const AddButton = () => {
  return (
    <Link to="/note/new" className="floating-button">
      <AddNewNoteButton />
    </Link>
  );
};

export default AddButton;
