import React from 'react';
import PropTypes from 'prop-types';
import {  Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

// export default function ProtectedRoute({ user, children, ...rest }) {
//     // const navigate = useNavigate();
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         if (user) {
//           return React.cloneElement(children, { user });
//         }

//         if (!user) {
//         //   return (
//         //     <Redirect
//         //       to={{
//         //         pathname: ROUTES.LOGIN,
//         //         state: { from: location }
//         //       }}
//         //     />
//         //   );
// 
//         }

//         return null;
//       }}
//     />
//   );
// }


export default function ProtectedRoute({ user, children, ...rest }) {
  // const navigate = useNavigate();
  if (user) {
    return children;
  }
  if (!user) {
    return <Navigate to={ROUTES.LOGIN}  replace={true} /> 
  }
  return null;
}


ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};