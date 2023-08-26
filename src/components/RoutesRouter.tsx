import { Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { FourOhFourPage } from '../pages/FourOhFourPage';
import PrivateRoute from './Routes/PrivateRoute';
import { GraphPageWrapped } from '../pages/GraphPage/GraphPageWrapped';
import { GRAPH_ROUTE, GRAPH_ROUTE_ID, HOME_ROUTE } from '../utils/routes';

export const RoutesRouter = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route
        path={HOME_ROUTE}
        element={<LandingPage />}
      />
      <Route element={<PrivateRoute />}>
        <Route
          path={GRAPH_ROUTE_ID}
          element={<GraphPageWrapped key={location.key} />}
        />
        <Route
          path={GRAPH_ROUTE}
          element={<GraphPageWrapped key={location.key} />}
        />
      </Route>
      <Route
        path='*'
        element={<FourOhFourPage />}
      />
    </Routes>
  );
};
