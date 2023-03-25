import { ReactComponent as PaperPlane } from '@/assets/icons/paper-plane.svg';
import { ADD_MESSAGE } from '@/libs/api/mutations';
import { LocalStorageService } from '@/services';
import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Textarea } from '../common';
import { MessageStatus, useChatContext } from './ChatContext';

const localStorageService = new LocalStorageService();

const MessageInput = () => {
	const { userId, channelId, setMessages, replaceMessage, updateMessageStatus } = useChatContext();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const storageKey = useMemo(() => `${userId}-${channelId}`, [channelId, userId]);

	// Hydrate textarea with message from local storage
	useEffect(() => {
		const message = localStorageService.get(storageKey);
		if (message) {
			textareaRef.current!.value = message as string;
			localStorageService.remove(storageKey);
		}
	}, [storageKey]);

	const [mutateAddMessage] = useMutation(ADD_MESSAGE);

	const handleAddMessage = useCallback(async () => {
		const message = textareaRef.current?.value?.trim();
		if (!message) return;

		// Update UI first
		textareaRef.current!.value = '';
		localStorageService.remove(storageKey);
		const beforeMessage = {
			messageId: uuidv4(),
			userId,
			datetime: new Date().toISOString(),
			text: message,
			status: MessageStatus.Sending,
		};
		setMessages(beforeMessage, true);

		// Send request to server
		try {
			await mutateAddMessage({
				variables: {
					channelId,
					text: message,
					userId,
				},
				onCompleted: ({ MessagePost }) => {
					if (!MessagePost) {
						throw new Error('MessagePost is null');
					}
					replaceMessage({
						...MessagePost,
						status: MessageStatus.Sent,
					});
				},
				onError: () => {
					updateMessageStatus(beforeMessage.messageId, MessageStatus.Failed);
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [
		channelId,
		mutateAddMessage,
		replaceMessage,
		setMessages,
		storageKey,
		updateMessageStatus,
		userId,
	]);

	const handleChange = useCallback(() => {
		const message = textareaRef.current?.value?.trim();
		if (!message) return;

		localStorageService.set(storageKey, message);
	}, [storageKey]);

	return (
		<div className='flex flex-col border-t p-4'>
			<Textarea
				rows={4}
				ref={textareaRef}
				onChange={handleChange}
				placeholder='Type your message here...'
			/>
			<Button
				icon={PaperPlane}
				className='w-40 mt-4'
				buttonText='Send Message'
				onClick={handleAddMessage}
			/>
		</div>
	);
};

export default MessageInput;
