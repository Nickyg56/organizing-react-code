import React from 'react';
import NoteList from './Notelist';
import Note from './Note';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import { Route } from 'react-router-dom';
import './styles/main.css';
import StoreContext from '../context/StoreContext';

class Main extends React.Component {
  static contextType = StoreContext;

  render() {
    return ( 
      <>
        <Route exact path='/' component={NoteList} />

        <Route path='/folder/:folderId' component={NoteList} />

        <Route path='/note/:noteId' component={Note} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>

    )
  }
}

export default Main
