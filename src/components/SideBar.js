import React from 'react';
import MainSideBar from './Mainsidebar';
import NoteSideBar from './NoteSideBar';
import { Route } from 'react-router-dom';
import './styles/sidebar.css';

class SideBar extends React.Component {

  render() {
    return (<>
      <Route exact path="/" component={MainSideBar} />

      <Route path="/folder/:folderId" component={MainSideBar} />

      <Route path="/note/:noteId" component={NoteSideBar} />

      <Route path="/add-folder" component={MainSideBar} />

      <Route path="/add-note" component={MainSideBar} />
    </>) 
  }
}

export default SideBar;