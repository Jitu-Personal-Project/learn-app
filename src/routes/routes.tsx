import Welcome from '../pages/Welcome/Welcome';
import Arrays from '../pages/Arrays/Arrays';
import ViewArrayIcon from '@mui/icons-material/ViewArray';

const routes = [
  {
    path: '/welcome',
    element: <Welcome />,
    name: 'Welcome',
    icon: <ViewArrayIcon />,
    exact: true,
    private: true,
  },

  {
    path: '/arrays',
    element: <Arrays />,
    name: 'Arrays',
    icon: <ViewArrayIcon />,
    exact: true,
    private: true,
  },
];

export default routes;
