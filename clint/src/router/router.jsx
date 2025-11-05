import { createBrowserRouter } from 'react-router';
import RootLayouts from '../layouts/RootLayouts';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayouts,
    errorElement: <p>Error ...</p>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'login',
        Component: Login,
      },
    ],
  },
]);
