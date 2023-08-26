import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RoutesRouter } from './components/RoutesRouter';
import { AuthProvider } from './components/Providers/AuthProvider';
import { ThemeProvider } from './components/Providers/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <RoutesRouter />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
