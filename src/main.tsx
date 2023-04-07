import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Main Component
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient();

// TODO: Move elsewhere
const lightTheme = createTheme({
	type: 'light',
});

const darkTheme = createTheme({
	type: 'dark',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider
				themes={['light', 'dark']}
				defaultTheme="dark"
				enableSystem
				enableColorScheme
				attribute="class"
				value={{
					light: lightTheme.className,
					dark: darkTheme.className,
				}}
			>
				<NextUIProvider>
					<Auth0Provider
						domain="dev-glsq34l88orjm8b1.us.auth0.com"
						clientId="4vqE5XNiGVyMUQONnGsPTQD2HoCxEQEm"
						audience="http://knwldom.com/api"
						cacheLocation="localstorage"
						authorizationParams={{
							redirect_uri: window.location.origin,
							audience: 'http://knwldom.com/api',
							scope: 'read:all',
						}}
					>
						<App />
					</Auth0Provider>
				</NextUIProvider>
			</NextThemesProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
