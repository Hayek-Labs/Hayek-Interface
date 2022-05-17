import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const ReactQueryProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
