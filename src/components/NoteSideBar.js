import React from 'react';
import StoreContext from '../context/StoreContext';
import PropTypes from 'prop-types';
import './styles/notesidebar.css';

class NoteSideBar extends React.Component {
  static contextType = StoreContext;
  render() {

  const currentNote = this.context.notes.find(
    note => note.id === this.props.match.params.noteId
  )

  const currentFolderId = currentNote.folderId
  console.log()

  const currentFolder = this.context.folders.find(
    folder => folder.id === currentFolderId
  )
  return ( 
    <div className='button-folder-container'>
    <button
      className='go-back'
      onClick={() => this.props.history.goBack()}
    >
      Go Back
    </button>
    <h2 className='folder-name'>{currentFolder.name}</h2>
  </div>
  )
}}

NoteSideBar.propTypes = {
  noteId: PropTypes.string,
}

export default NoteSideBar;