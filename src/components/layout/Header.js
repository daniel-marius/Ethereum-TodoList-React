import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">TodoList DApp</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/todolist/rest">TodoList REST</Link></li>
          <li><Link to="/todolist/chain">TodoList Chain</Link></li>
          <li><Link to="/blockexplorer">Ethereum Block Explorer</Link></li>
          <li><Link to="/ipfs/upload">IPFS Upload</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
