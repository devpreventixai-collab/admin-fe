import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>PreventixAI</h2>
      </div>
      <ul className="sidebar-menu">
        <li className={isActive('/dashboard') ? 'active' : ''}>
          <Link to="/dashboard">
            <span className="icon">📊</span>
            Dashboard
          </Link>
        </li>
        <li className={isActive('/companies') ? 'active' : ''}>
          <Link to="/companies">
            <span className="icon">🏢</span>
            Companies
          </Link>
        </li>
        <li className={isActive('/managers') ? 'active' : ''}>
          <Link to="/managers">
            <span className="icon">👥</span>
            Managers
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
          <span className="icon">🚪</span>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;