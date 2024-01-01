import { createBrowserRouter } from 'react-router-dom';
import Entry from '../pages';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';

export const routes = {
  entry: {
    path: '/'
  },
  signIn: {
    path: '/sign-in'
  },
  signUp: {
    path: '/sign-up'
  },
};

export const router = createBrowserRouter([
  {
    path: routes.entry.path,
    element: <Entry />,
  },
  {
    path: routes.signIn.path,
    element: <SignIn />,
  },
  {
    path: routes.signUp.path,
    element: <SignUp />,
  },
]);
