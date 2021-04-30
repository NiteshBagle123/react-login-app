import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

const Navigation = () => {
  const ctx = useContext(AuthContext);
  // return (
    // <AuthContext>
    //   {(ctx) => {
        return (<nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={ctx.onLogOut}>Logout</button>
            </li>
          )}
        </ul>
      </nav>)
  //     }}
  //   </AuthContext>
  // );
};

export default Navigation;
