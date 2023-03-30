import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Main Component
import App from './App';

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
					<App />
				</NextUIProvider>
			</NextThemesProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
