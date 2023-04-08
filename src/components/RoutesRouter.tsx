import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { GraphPage } from '../pages/GraphPage';
import { FourOhFourPage } from '../pages/FourOhFourPage';
import PrivateRoute from './Routes/PrivateRoute';

export const RoutesRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<LandingPage />} />
				<Route element={<PrivateRoute />}>
					<Route path="/app" element={<GraphPage />} />
				</Route>
				<Route path="*" element={<FourOhFourPage />} />
			</Routes>
		</BrowserRouter>
	);
};
