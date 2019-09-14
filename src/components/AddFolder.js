// Create a new component AddFolder that
// implements a form to capture the name
// of a new folder from the user. This
// form should submit the name of the new
// folder to the POST /folders endpoint on
// the server. Ensure that any errors are
// properly handled. Add a button to the
// navigation to invoke the new form.

import React from "react";
import StoreContext from "../context/StoreContext";
import "./styles/AddFolder.css";

class AddFolder extends React.Component {
  static contextType = StoreContext;

  render() {
    return (
      <form onSubmit={e => this.context.handleSave(e)}>
        <label htmlFor="folder-input">Folder Name: </label>
        <input
          type="text"
          name="newFolder"
          id="folder-input"
          placeholder="Not Important"
          className="form-input"
          aria-label="New folder name"
          aria-required="true"
          required
          onChange={e => this.context.updateUserInput(e.target.value)}
        />
        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    );
  }
}

export default AddFolder;
