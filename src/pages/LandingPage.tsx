import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/common/Buttons/Button';
import { CenteredContainer } from '../components/common/Containers/CenteredContainer';
import { HeaderText } from '../components/common/Text/HeaderText';

export const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  const onLogin = () => loginWithRedirect();
  const onSignup = () =>
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });

  return (
    <CenteredContainer
      css={{
        gap: '20px',
      }}
    >
      <HeaderText>Kingdom of Knowledge</HeaderText>
      <Button
        type='gradient'
        onClick={onLogin}
      >
        Log in
      </Button>
      <Button
        type='gradient'
        onClick={onSignup}
      >
        Sign up
      </Button>
    </CenteredContainer>
  );
};
