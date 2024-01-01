import { createBrowserRouter } from 'react-router-dom';
import Entry from '../pages';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import Dashboard from '../pages/dashboard';

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
  dashboard: {
    path: '/dashboard',
    deals: {
      path: '/dashboard/deals'
    },
    transactions: {
      path: '/dashboard/transactions'
    },
  }
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
  {
    path: routes.dashboard.path,
    element: <Dashboard />,
  },
]);
