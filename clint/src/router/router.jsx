import { createBrowserRouter } from 'react-router';
import RootLayouts from '../layouts/RootLayouts';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import About from '../components/About';
import JobDetals from '../pages/JobDetals';

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
        path: 'about',
        Component: About,
      },
      {
        path: 'jobs/:id',
        Component: JobDetals,
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
