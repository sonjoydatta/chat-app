import { ChannelId, MessageEnum, UserId } from '@/libs/api/generated/graphql';
import { createContext, useContext, useState } from 'react';

type ChatContextType = {
	userId: UserId;
	channelId: ChannelId;
	messages: MessageEnum[];
	setUserId: (userId: UserId) => void;
	setChannelId: (channelId: ChannelId) => void;
	setMessages: (messages: MessageEnum | MessageEnum[], old?: boolean) => void;
};

const initialContext: ChatContextType = {
	userId: UserId.Joyse,
	channelId: ChannelId.General,
	messages: [],
	setUserId: () => void 0,
	setChannelId: () => void 0,
	setMessages: () => void 0,
};

const ChatContext = createContext<ChatContextType>(initialContext);

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [userId, setUserId] = useState<UserId>(UserId.Joyse);
	const [channelId, setChannelId] = useState<ChannelId>(ChannelId.General);
	const [messages, setMessages] = useState<MessageEnum[]>([]);

	const handleSetMessages = (messages: MessageEnum | MessageEnum[], old = false) => {
		if (Array.isArray(messages)) {
			setMessages((prevMessages) =>
				old ? [...messages, ...prevMessages] : [...prevMessages, ...messages]
			);
		} else {
			setMessages((prevMessages) =>
				old ? [messages, ...prevMessages] : [...prevMessages, messages]
			);
		}
	};

	return (
		<ChatContext.Provider
			value={{
				userId,
				channelId,
				messages,
				setUserId,
				setChannelId,
				setMessages: handleSetMessages,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

const useChatContext = () => {
	const context = useContext(ChatContext);

	if (context === undefined) {
		throw new Error('useChatContext must be used within a ChatContextProvider');
	}

	return context;
};

export { ChatContext, ChatContextProvider, useChatContext };
