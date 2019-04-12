import React from 'react';
import { Link } from 'react-router-dom';  // Link tells BrowserRouter to change the URL


const GameMenu = () => (
  <nav >
    <ul className="nav__menu">
      <li className="nav__menu-item">
        <Link to="/">Stone Age</Link>
      </li>
      <Link className="nav__menu-item" to="/7wonders">7 Wonders</Link>
    </ul>
  </nav>
)

export default GameMenu;