import { useAuth0 } from '@auth0/auth0-react';
import { Container, Text, Button } from '@nextui-org/react';

export const LandingPage = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Container
			css={{
				display: 'flex',
				flexFlow: 'column',
				gap: '10px',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text
				h1
				size={60}
				css={{
					backgroundImage: 'linear-gradient(45deg, #5514B4, #FF80FF)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
				weight="bold"
			>
				Kingdom of Knowledge
			</Text>
			<Button color="gradient" auto onPress={() => loginWithRedirect()}>
				Log in
			</Button>
			<Button
				color="gradient"
				auto
				onPress={() =>
					loginWithRedirect({
						authorizationParams: {
							screen_hint: 'signup',
						},
					})
				}
			>
				Sign up
			</Button>
		</Container>
	);
};
