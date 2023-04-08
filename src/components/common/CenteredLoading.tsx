import { Container, Loading } from '@nextui-org/react';

export const CenteredLoading = () => {
	return (
		<Container
			css={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Loading />
		</Container>
	);
};
