import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import {Suspense, lazy} from 'react';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/user-auth-listener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/protected-route';
import IsUserLogged from './helpers/is-user-logged';

function App() {


// Using lazy loading
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/sign-up'));
const NotFound = lazy(() => import ('./pages/not-found'));
const Dashboard = lazy(() => import ('./pages/dashboard'));
const Profile = lazy(() => import ('./pages/profile'));
const {user} = useAuthListener();


  return (
    <UserContext.Provider value = {{user}}>
    <Router>
      <Suspense fallback ={<p>Loading ...</p>}>
        <Routes>
          <Route path={ROUTES.PROFILE} Component={Profile} />
          <Route path={ROUTES.LOGIN} Component={Login} />
          <Route path={ROUTES.SIGN_UP} Component={SignUp} />
          {/* <Route path={ROUTES.LOGIN} element={
            <IsUserLogged user={user} exact>
            <Login />
          </IsUserLogged>
          } />
          <Route path={ROUTES.SIGN_UP} element={
            <IsUserLogged user={user} exact>
              <SignUp />
            </IsUserLogged>
          } /> */}
          <Route path={ROUTES.DASHBOARD} element={
            <ProtectedRoute user={user} exact>
              <Dashboard user={user}/>
            </ProtectedRoute>
          } />
          <Route path={ROUTES.NOT_FOUND}  Component={NotFound} />
        </Routes>
      </Suspense>
    </Router>
    </UserContext.Provider>
  );
}

export default App;

// Todo
// Change Loading para