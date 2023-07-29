import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/common/Buttons/Button';
import { CenteredContainer } from '../../components/common/Containers/CenteredContainer';
import { HeaderText } from '../../components/common/Text/HeaderText';

export const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

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
      <HeaderText>{t('landingPage.title')}</HeaderText>
      <Button
        type='gradient'
        onClick={onLogin}
      >
        {t('landingPage.login')}
      </Button>
      <Button
        type='gradient'
        onClick={onSignup}
      >
        {t('landingPage.signup')}
      </Button>
    </CenteredContainer>
  );
};
