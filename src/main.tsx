import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

import { API } from '../config';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Toaster } from 'react-hot-toast';

const errorMessage = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      console.info(`GraphQL Error: ${message}`);
    });
  }
  if (networkError) {
    console.info(`Network Error: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorMessage, API]),
  cache: new InMemoryCache(),
});

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <ApolloProvider client={client}>
    <Toaster position='top-center' />
    <App />
  </ApolloProvider>
);
