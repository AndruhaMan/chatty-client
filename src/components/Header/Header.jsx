import { useLocation } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';

export const Header = ({ closeSocket }) => {
  const { pathname } = useLocation();
  const handleLogoutClick = () => {
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('userName');
    closeSocket();
  }

  return (
    <header className="Header">
      <div className="Header__icon"></div>
      <h1 className="Header__title">Chatty</h1>

      <button
        className={classNames(
          'Header__logout',
          {hidden: pathname === '/login' || pathname === '/signup'},
        )}
        onClick={handleLogoutClick}
      >
        Log out
      </button>
    </header>
  );
}