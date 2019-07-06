import React from "react";
import "./styles/note.css";
import StoreContext from "../context/StoreContext";

class Note extends React.Component {
  static contextType = StoreContext;

  render() {
    const note = this.context.notes.find(
      note => `/note/${note.id}` === this.props.match.url
    );

    if (!note) {
      return "page not found";
    }

    const date = new Date(note.modified);
    const convertedDate = date.toDateString();

    return (
      <div key={note.id}>
        <div className="expanded-note">
          <h2 className="note-name">{note.name}</h2>
          <p>Date Modified On: {convertedDate}</p>
          <button type="button" onClick={() => this.context.handleDelete(note.id)}>
            Delete Note
          </button>
        </div>

        <p className="note-content">{note.content}</p>
      </div>
    );
  }
}

export default Note;
