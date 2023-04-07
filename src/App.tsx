import { Graph } from './components/Graph/Graph';
import { Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export default function App(): JSX.Element {
	const { isDark } = useTheme();
	const { setTheme } = useNextTheme();
	const { loginWithRedirect, logout, getAccessTokenSilently, user } = useAuth0();

	useEffect(() => {
		const getAccessToken = async () => {
			try {
				const accessToken = await getAccessTokenSilently();
				console.log(accessToken);
				localStorage.setItem('accesstoken', accessToken);
			} catch (e) {
				console.log(e.message);
			}
		};
		void getAccessToken();
	}, [getAccessTokenSilently, user?.sub]);

	// TODO: Can do dark mode switch
	return (
		<>
			<button onClick={() => loginWithRedirect()}>Log In</button>
			<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
			<Switch
				style={{ display: 'none' }}
				checked={isDark ?? false}
				defaultChecked
				onChange={(e) => {
					setTheme(e.target.checked ? 'dark' : 'light');
				}}
			/>
			<Graph userId={3} />
		</>
	);
}
