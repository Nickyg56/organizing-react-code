import React from "react";
import { Link } from "react-router-dom";
import "./styles/Notelist.css";
import StoreContext from "../context/StoreContext";
import PropTypes from "prop-types";

class NoteList extends React.Component {
  static contextType = StoreContext;

  render() {
    const filteredNoteList = this.context.notes
      .filter(note => `/folder/${note.folder_id}` === this.props.match.url)
      .map(note => {
        const date = new Date(note.date_modified);
        const convertedDate = date.toDateString();
        return (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>
              <h2>{note.note_name}</h2> 
            </Link>
            <p>Date Modified On: {convertedDate}</p>
            <button
              type="button"
              className="delete-button"
              onClick={() => this.context.handleDelete(note.id)}
            >
              Delete Note
            </button>
          </li>
        );
      });

    const noteList = this.context.notes.map((note, i) => {
      const date = new Date(note.date_modified);
      const convertedDate = date.toDateString();
      return (
        <li key={i}>
          <Link to={`/note/${note.id}`}>
            <h2>{note.note_name}</h2>
          </Link>
          <p>Date Modified On: {convertedDate}</p>
          <button
            type="button"
            className="delete-button"
            onClick={() => this.context.handleDelete(note.id)}
          >
            Delete Note
          </button>
        </li>
      );
    });

    if (this.props.match.url === "/") {
      return (
        <div className="note-list">
          <ul>{noteList}</ul>
          <Link to="/add-note">
            <button className="add-note">Add Note</button>
          </Link>
        </div>
      );
    } else
      return (
        <div className="note-list">
          <ul>{filteredNoteList}</ul>
          <Link to="/add-note">
            <button className="add-note">Add Note</button>
          </Link>
        </div>
      );
  }
}

NoteList.propTypes = {
  url: PropTypes.string
};

export default NoteList;
