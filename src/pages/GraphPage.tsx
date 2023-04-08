import { Graph } from '../components/Graph/Graph';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@nextui-org/react';

export const GraphPage = () => {
	const { logout } = useAuth0();

	return (
		<>
			<Button
				color="secondary"
				css={{ position: 'absolute', width: '200px', left: '15px', margin: '20px', zIndex: 2 }}
				onPress={() => logout({ logoutParams: { returnTo: import.meta.env.VITE_LANDING_PAGE } })}
			>
				Log Out
			</Button>
			<Graph userId={3} />
		</>
	);
};
