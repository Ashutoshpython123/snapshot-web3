import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
    const { auth } = useSelector((state) => state);
    var isAdmin = false;

	if (auth.token && auth.role) {
		isAdmin = true;
	}
   

    return (

        // Show the component only when the user is Admin in
        // Otherwise, redirect the user to Login page
        <Route {...rest} render={props => (
            isAdmin ?
                <Component {...props} />
            : ""
        )} />
    );
};

export default PrivateRoute;