import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/Mainsidebar.css'
import StoreContext from '../context/StoreContext'

class MainSideBar extends React.Component {

  static contextType = StoreContext;

  render() {
    const folderList = this.context.folders.map(folder => {
      return (
        <li key={folder.id} className='nav-list'>
          <NavLink to={`/folder/${folder.id}`} style={{ textDecoration: 'none' }}>
            {folder.name}
          </NavLink>
        </li>
      ) 
    })
    return (
      <div className='nav-container'>
        <nav>
        <ul className='nav-list-container'>
          {folderList}
        </ul>
        </nav>
        <Link to='/add-folder'>
          <button className='add-button'>Add Folder</button>
        </Link>
      </div>
    )
  }
}

export default MainSideBar;
