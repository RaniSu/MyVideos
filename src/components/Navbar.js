import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.title}>
          <Link to="/">MyVideos</Link>
        </li>

      
      {user&&(
          <>
          <li className={styles.navbarItem}>
            <Link to='/favorite' className={styles.navbarLink}>
              Favorite
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to='/' className={styles.navbarLink}>
              Home
            </Link>
            
          </li>
          </>
      )}
      <div style={{display:"inline-block" ,paddingRight:"45%"}}></div>
        {!user && (
          <>
            <li className={styles.navbarItem}>
              <Link to="/login" className={styles.navbarLink}>
                Login
              </Link>
            </li>
            <li className={styles.navbarItem}>
              <Link to="/signup" className={styles.navbarLink}>
                Signup
              </Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li className={styles.greeting}>
              Hello, {user.displayName}
            </li>
            <li className={styles.navbarItem}>
              <button className={`btn ${styles.logoutButton}`} onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
