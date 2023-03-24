import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './assets/css/main.css';
import config from './config';

const client = new ApolloClient({
	uri: config.apiURL,
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
