import { useScroll } from '@/libs/hooks';
import { useState } from 'react';
import { useChatContext } from './ChatContext';
import { useGetLatestMessages, useGetMoreMessages } from './hooks';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatConversation = () => {
	const [isBtnVisible, setBtnVisible] = useState({ prev: true, next: true });
	const { userId, channelId, messages, setMessages } = useChatContext();
	const { elementRef, scrollToBottom, scrollToTop } = useScroll();

	// Fetch latest messages
	const { loading } = useGetLatestMessages({
		channelId,
		setMessages,
		scrollToBottom,
	});

	// Fetch more messages
	const handleReadMore = useGetMoreMessages({
		channelId,
		messages,
		setMessages,
		setBtnVisible,
		scrollToTop,
		scrollToBottom,
	});

	return (
		<div className='flex flex-col w-full h-full'>
			<div className='border-b p-4'>
				<p>{channelId} Channel</p>
			</div>

			<MessageList ref={elementRef} loading={loading} empty={messages?.length < 1}>
				<MessageList.LoadMore
					next={true}
					visible={isBtnVisible.next}
					onClick={() => handleReadMore(false)}
				/>
				{messages.map((message) => (
					<MessageList.Item
						key={message.messageId}
						{...{
							...message,
							userType: message.userId === userId ? 'me' : 'other',
						}}
					/>
				))}
				<MessageList.LoadMore
					next={false}
					visible={isBtnVisible.prev}
					onClick={() => handleReadMore(true)}
				/>
			</MessageList>

			<MessageInput />
		</div>
	);
};

export default ChatConversation;
