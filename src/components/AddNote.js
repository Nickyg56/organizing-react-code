

import React from "react";
import StoreContext from "../context/StoreContext";
import './styles/AddNote.css';

class AddNote extends React.Component {
  static contextType = StoreContext;

  render() {
    let {error} = this.context
    let errorMessage = '';
    if(error){
      errorMessage = <div style={{color: 'red'}}>{error}</div>
    }
    return (
      <form
        className="add-note"
        id="add-note"
        onSubmit={e => this.context.handleNoteSave(e)}
      >
        {error && errorMessage}
        <label htmlFor="note-name">
          {" "}
          Note Name:
          <input
            type="text"
            name="newNote"
            id="note-name"
            placeholder="Unicorns"
            className="form-input"
            aria-label="New note name"
            aria-required="true"
            onChange={e => this.context.updateNoteName(e.target.value)}
            required
          />
        </label>

        <label htmlFor="note-content">
          Note Content:
          <textarea
            id="note-content"
            form="add-note"
            name="note-content"
            placeholder="A mythical animal typically represented as a horse with a single straight horn porjecting from its forehead..."
            wrap="soft"
            aria-label="New note content"
            aria-required="true"
            onChange={e => this.context.updateNoteContent(e.target.value)}
            required
          />
        </label>
        <label htmlFor="folder-list">
          Folder:
          <select
            id="folder-list"
            required
            onChange={e => this.context.updateFolderChoice(e.target.value)}
          >
            <option value="select a folder" aria-label="Choose a folder">Select a Folder</option>
            {this.context.folders.map((folder, index) => (
              <option key={index} value={folder.id}>
                {folder.folder_name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Save</button>
      </form>
    );
  }
}

export default AddNote;
