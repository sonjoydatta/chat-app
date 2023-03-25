import { useScroll } from '@/libs/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useChatContext } from './ChatContext';
import {
	useGetLatestMessages,
	useGetMoreMessages,
	useHydrateMessage,
	useSendMessage,
} from './hooks';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const initialBtnState = { prev: true, next: true };

const ChatConversation = () => {
	const [isBtnVisible, setBtnVisible] = useState(initialBtnState);
	const {
		userId,
		channelId,
		messages,
		setMessages,
		handleSetMessages,
		replaceMessage,
		updateMessageStatus,
	} = useChatContext();
	const { elementRef, scrollToBottom, scrollToTop } = useScroll();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		setBtnVisible(initialBtnState);
	}, [channelId]);

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
		handleSetMessages,
		setBtnVisible,
		scrollToTop,
		scrollToBottom,
	});

	// Hydrate textarea from local storage
	const storageKey = useMemo(() => `${userId}-${channelId}`, [userId, channelId]);
	const { handleAddToStorage, handleRemoveFromStorage } = useHydrateMessage({
		storageKey,
		textareaRef,
	});

	// Post a new message
	const { handleAddMessage, handleRetryMessage } = useSendMessage({
		userId,
		channelId,
		handleSetMessages,
		replaceMessage,
		updateMessageStatus,
		textareaRef,
		handleRemoveFromStorage,
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
				{messages.map((message) => {
					const userType = message.userId === userId ? 'me' : 'other';
					const onRetry = () => handleRetryMessage(message);

					return (
						<MessageList.Item
							key={message.messageId}
							{...{
								...message,
								userType,
								onRetry,
							}}
						/>
					);
				})}
				<MessageList.LoadMore
					next={false}
					visible={isBtnVisible.prev}
					onClick={() => handleReadMore(true)}
				/>
			</MessageList>

			<MessageInput
				ref={textareaRef}
				onTextChange={handleAddToStorage}
				onAddMessage={handleAddMessage}
			/>
		</div>
	);
};

export default ChatConversation;
