import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";

const mapStateToProps = ({ session: { userId, userRole } }) => ({
  loggedIn: Boolean(userId),
  admin: userRole === "Admin"
});

const Auth = ({ loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn ?
      <Redirect to='/' /> :
      <Component {...props} />
    )}
  />
);

const Protected = ({ admin, loggedIn, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      (loggedIn && admin )? 
      <Component {...props} /> :
      <Redirect to='/login' />
    )}
  />
);

export const AuthRoute = withRouter(
  connect(mapStateToProps)(Auth)
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps)(Protected)
);