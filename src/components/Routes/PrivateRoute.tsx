import { Outlet, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { CenteredLoading } from '../common/CenteredLoading';

const PrivateRoute = () => {
	const { user, isLoading, getAccessTokenSilently } = useAuth0();

	const [loading, setLoading] = useState(isLoading);

	const handleAuthenticated = async () => {
		try {
			const token = await getAccessTokenSilently();
			localStorage.setItem('accesstoken', token);
		} catch (e) {
			// console.error(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!isLoading) {
			void handleAuthenticated();
		}
	}, [isLoading]);

	if (loading) return <CenteredLoading />;

	if (user !== null && typeof user !== 'undefined') {
		return <Outlet />;
	} else {
		return <Navigate to={'/'} />;
	}
};

export default PrivateRoute;
