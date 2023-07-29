import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    output: {
      mode: 'split',
      target: 'src/services/generatedApi/api.ts',
      schemas: 'src/types/generatedApi/',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/utils/apiClients/apiClientInstance.ts',
          name: 'apiClientInstance',
        },
      },
    },
    input: {
      target: 'http://localhost:8080/v3/api-docs',
    },
  },
});