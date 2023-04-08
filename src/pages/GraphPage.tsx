import { Graph } from '../components/Graph/Graph';
import { Button } from '../components/common/Buttons/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { FloatingContainer } from '../components/common/Containers/FloatingContainer';

export const GraphPage = () => {
  const { logout } = useAuth0();

  const onLogout = () => logout({ logoutParams: { returnTo: import.meta.env.VITE_LANDING_PAGE } });

  return (
    <>
      <FloatingContainer type='left'>
        <Button
          type='secondary'
          onClick={onLogout}
        >
          Log Out
        </Button>
      </FloatingContainer>
      <Graph userId={3} />
    </>
  );
};
