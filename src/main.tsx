import { ApolloClient, ApolloProvider, DefaultOptions, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './assets/css/main.css';
import config from './config';

// Disable GraphQL cache
const defaultOptions: DefaultOptions = {
	watchQuery: { fetchPolicy: 'no-cache' },
	query: { fetchPolicy: 'no-cache' },
};

const client = new ApolloClient({
	uri: config.apiURL,
	cache: new InMemoryCache(),
	defaultOptions,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
