import React from 'react';
import './App.css';
import Main from './components/Main';
import SideBar from './components/SideBar';
import Header from './components/Header';
import StoreContext from './context/StoreContext';
import NoteErrorBoundary from './NoteErrorBoundary';
import FolderErrorBoundary from './FolderErrorBoundary';
import {withRouter} from 'react-router-dom';
import config from './config';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    userInput: '',
    userNoteName: '',
    userNoteContent: '',
    userFolderChoice: '',
    error: null,
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(resJson => {
        this.setState({
          folders: resJson
        });
      })
      .catch(error => {
        console.log(error);
      });

    fetch(`${config.API_ENDPOINT}/notes`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(resJson => {
        this.setState({
          notes: resJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUserInput = (userInput) => {
    this.setState({
      userInput: userInput
    })
  }

  updateNoteName = (userInput) => {
    this.setState({
      userNoteName: userInput
    })
  }

  updateNoteContent = (userInput) => {
    this.setState({
      userNoteContent: userInput
    })
  }

  updateFolderChoice = (userInput) => {
    console.log(userInput)
    this.setState({
      userFolderChoice: userInput
    })
  }

  handleDelete = (noteId) => {
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: new Headers({'Content-Type': 'application/json'})
    })

    let filterDeleted = this.state.notes.filter(note =>
      note.id !== noteId)
    this.setState({
      notes: filterDeleted
    })
    this.props.history.push('/');
  }
  
  handleSave = (event) => {
    event.preventDefault();

    const newFolder = {folder_name: this.state.userInput};
    console.log(this.state.userInput);
    // Send to API (POST)
    return fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST', 
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(newFolder)
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(resJson => {
        console.log(resJson);
        this.setState({
          folders: [...this.state.folders, newFolder]
        })
        this.props.history.push('/');
      })
      .catch(error => console.log(error));
  }

  handleNoteSave = (event) => {
    event.preventDefault();

    if (this.state.userFolderChoice === ''){
      this.setState({error: 'Must choose valid folder'})
    } else {
      const newNote = {
        note_name: this.state.userNoteName,
        content: this.state.userNoteContent,
        folder_id: this.state.userFolderChoice,
        date_modified: new Date()
      };
      console.log(this.state.userInput);
      // Send to API (POST)
      return fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST', 
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(newNote)
      })
        .then(res => {
          if(res.ok) {
            return res.json();
          }
          throw new Error(res.statusText);
        })
        .then(resJson => {
          console.log(resJson);
          this.setState({
            notes: [...this.state.notes, resJson]
          }, () => console.log(this.state.notes))
          this.props.history.push('/');
        })
        .catch(error => console.log(error));
    }

    
  }

  render() {
    console.log(this.state.folders, this.state.notes)
    return (
      <StoreContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          handleDelete: this.handleDelete,
          handleSave: this.handleSave,
          handleNoteSave: this.handleNoteSave,
          updateUserInput: this.updateUserInput,
          updateNoteName: this.updateNoteName,
          updateNoteContent: this.updateNoteContent,
          updateFolderChoice: this.updateFolderChoice,
          error: this.state.error,
        }}
      >
        <div className='App'>
          <Header />
          <FolderErrorBoundary>
            <SideBar />
          </FolderErrorBoundary>
          <NoteErrorBoundary>
            <Main />
          </NoteErrorBoundary>
        </div> 
      </StoreContext.Provider>
    );
  }
}

export default withRouter(App);
