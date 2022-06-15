import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import { Container, Icon } from 'tabler-icons-react';

import Containers from '../containers/Containers';
import Images from '../images/Images';

type RouteMeta = {
  title: string;
  icon: Icon;
  color: string;
};

const DEFAULT_ROUTE = 'containers';

export const ROUTES: (RouteObject & { meta?: RouteMeta })[] = [
  {
    path: 'containers',
    element: <Containers />,
    meta: {
      title: 'Containers',
      icon: Container,
      color: 'blue',
    },
  },
  {
    path: 'images',
    element: <Images />,
    meta: {
      title: 'Images',
      icon: Container,
      color: 'teal',
    },
  },
  {
    path: 'dashboard',
    element: <Containers />,
    meta: {
      title: 'Dashboard',
      icon: Container,
      color: 'violet',
    },
  },
  {
    path: '*',
    element: <Navigate to={DEFAULT_ROUTE} />,
  },
];

export const Routes = () => {
  const routes = useRoutes(ROUTES);

  return routes;
};
