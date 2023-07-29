import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { FourOhFourPage } from '../pages/FourOhFourPage';
import PrivateRoute from './Routes/PrivateRoute';
import { GraphPageWrapped } from '../pages/GraphPage/GraphPageWrapped';

export const RoutesRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<LandingPage />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            path='/app'
            element={<GraphPageWrapped />}
          />
        </Route>
        <Route
          path='*'
          element={<FourOhFourPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
