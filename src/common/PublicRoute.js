import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const currentUser = AuthService.getCurrentUser();
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            currentUser && restricted ?
                <Navigate to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;