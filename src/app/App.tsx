import { ChannelId } from '@/libs/api/generated/graphql';
import { GET_LATEST_MESSAGES } from '@/libs/api/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	const { loading, data, refetch } = useQuery(GET_LATEST_MESSAGES, {
		variables: { channelId: ChannelId.General },
		fetchPolicy: 'no-cache',
	});
	console.log(data);

	return (
		<div className='App'>
			<h1>Vite + React</h1>
			<div className='card'>
				<button
					className='px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm'
					onClick={() => {
						setCount((count) => count + 1);
						// refetch();
					}}
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</div>
	);
}

export default App;
