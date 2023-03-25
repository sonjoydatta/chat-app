import { ChannelId, MessageEnum, UserId } from '@/libs/api/generated/graphql';
import { createContext, useContext, useState } from 'react';

enum MessageStatus {
	Sending = 'sending',
	Failed = 'failed',
	Sent = 'sent',
}

interface IMessageEnum extends MessageEnum {
	status?: MessageStatus;
}

export type ChatContextType = {
	userId: UserId;
	channelId: ChannelId;
	messages: IMessageEnum[];
	setUserId: (userId: UserId) => void;
	setChannelId: (channelId: ChannelId) => void;
	setMessages: (messages: IMessageEnum[], old?: boolean) => void;
	handleSetMessages: (messages: IMessageEnum | IMessageEnum[], old?: boolean) => void;
	replaceMessage: (messageId: string, message: IMessageEnum) => void;
	updateMessageStatus: (messageId: string, status: MessageStatus) => void;
};

const initialContext: ChatContextType = {
	userId: UserId.Joyse,
	channelId: ChannelId.General,
	messages: [],
	setUserId: () => void 0,
	setChannelId: () => void 0,
	setMessages: () => void 0,
	handleSetMessages: () => void 0,
	replaceMessage: () => void 0,
	updateMessageStatus: () => void 0,
};

const ChatContext = createContext<ChatContextType>(initialContext);

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [userId, setUserId] = useState<UserId>(UserId.Joyse);
	const [channelId, setChannelId] = useState<ChannelId>(ChannelId.General);
	const [messages, setMessages] = useState<IMessageEnum[]>([]);

	const handleSetMessages = (messages: IMessageEnum | IMessageEnum[], old = false) => {
		if (Array.isArray(messages)) {
			setMessages((prev) => (old ? [...messages, ...prev] : [...prev, ...messages]));
		} else {
			setMessages((prev) => (old ? [messages, ...prev] : [...prev, messages]));
		}
	};

	const replaceMessage = (messageId: string, message: IMessageEnum) => {
		setMessages((prev) => prev.map((item) => (item.messageId === messageId ? message : item)));
	};

	const updateMessageStatus = (messageId: string, status: MessageStatus) => {
		setMessages((prev) =>
			prev.map((item) => (item.messageId === messageId ? { ...item, status } : item))
		);
	};

	return (
		<ChatContext.Provider
			value={{
				userId,
				channelId,
				messages,
				setUserId,
				setChannelId,
				setMessages,
				handleSetMessages,
				replaceMessage,
				updateMessageStatus,
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

export { MessageStatus, ChatContext, ChatContextProvider, useChatContext };
