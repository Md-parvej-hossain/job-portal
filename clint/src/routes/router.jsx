import { createBrowserRouter } from 'react-router';
import RootLayouts from '../layouts/RootLayouts';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import About from '../components/About';
import JobDetals from '../pages/JobDetals';
import PrivateRoutes from './PrivateRoutes';
import JobApply from '../components/JobApply';

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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
        Component: JobDetals,
      },
      {
        path: 'jobApply/:id',
        element: (
          <PrivateRoutes>
            <JobApply></JobApply>
          </PrivateRoutes>
        ),
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
