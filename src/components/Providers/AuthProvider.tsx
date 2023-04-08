import { Auth0Provider } from '@auth0/auth0-react';

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENTID}
      cacheLocation='localstorage'
      useRefreshTokens
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_LOGIN_CALLBACK_PAGE,
        scope: 'openid email profile',
        audience: import.meta.env.VITE_AUTH_AUDIENCE,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
