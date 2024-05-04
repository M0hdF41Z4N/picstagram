import React from 'react';
import PropTypes from 'prop-types';
import {  Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';



export default function IsUserLogged({ user, children, ...rest }) {
    // const navigate = useNavigate();
    if (!user) {
      return children;
    }
    if (user) {
      return <Navigate to={ROUTES.DASHBOARD}  replace={true} /> 
    }
    return null;
  }
  
  
  IsUserLogged.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
  };

