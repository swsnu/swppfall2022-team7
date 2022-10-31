import '@scss/Root.scss';
import { routes } from '@routes/routerconfig';
import { useRoutes } from 'react-router-dom';
import { ReactElement } from 'react';

const App: () => ReactElement | null = () => {
  return useRoutes(routes);
};

export default App;
