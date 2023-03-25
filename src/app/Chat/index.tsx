import { ChatContextProvider } from './ChatContext';
import ChatConversation from './ChatConversation';
import ChatSidebar from './ChatSidebar';

const Chat = () => (
	<ChatContextProvider>
		<div className='flex w-full h-full max-w-6xl mx-auto bg-[#f4f5fb]'>
			<ChatSidebar />
			<ChatConversation />
		</div>
	</ChatContextProvider>
);

export default Chat;
