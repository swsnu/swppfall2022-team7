import '@scss/Root.scss';
import { routes } from '@routes/routerconfig';
import { useRoutes } from 'react-router-dom';

const App: React.FC = () => {
  return useRoutes(routes);
};

export default App;
