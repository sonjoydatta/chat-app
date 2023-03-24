import { useChatContext } from './ChatContext';
import MessageList from './MessageList';

const ChatConversation = () => {
	const { channelId } = useChatContext();

	return (
		<div className='flex flex-col w-full h-full'>
			<div className='border-b p-4'>
				<p>{channelId} Channel</p>
			</div>

			{/* Conversations  */}
			<MessageList />

			{/* Input */}
			<div className='flex flex-row items-center border-t'>
				<input
					type='text'
					className='flex-1 px-4 py-2 text-sm text-gray-500 placeholder-gray-500 border-none focus:outline-none'
					placeholder='Type a message'
				/>
				<button className='flex items-center justify-center w-12 h-12 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none'></button>
			</div>
		</div>
	);
};

export default ChatConversation;
