import { MessageEnum } from '@/libs/api/generated/graphql';
import { ADD_MESSAGE } from '@/libs/api/mutations';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { ChatContextType, MessageStatus } from '../ChatContext';

interface UseSendMessage
	extends Required<
		Pick<
			ChatContextType,
			'userId' | 'channelId' | 'setMessages' | 'replaceMessage' | 'updateMessageStatus'
		>
	> {
	textareaRef: React.RefObject<HTMLTextAreaElement>;
	handleRemoveFromStorage: () => void;
}

const useSendMessage = ({
	userId,
	channelId,
	setMessages,
	replaceMessage,
	updateMessageStatus,
	textareaRef,
	handleRemoveFromStorage,
}: UseSendMessage) => {
	const [mutateAddMessage] = useMutation(ADD_MESSAGE);

	const handleAddMessage = async () => {
		const message = textareaRef.current?.value?.trim();
		if (!message) return;

		// Update UI first
		textareaRef.current!.value = '';
		handleRemoveFromStorage();
		const beforeMessage = {
			messageId: uuidv4(),
			userId,
			datetime: new Date().toISOString(),
			text: message,
			status: MessageStatus.Sending,
		};
		setMessages(beforeMessage, true);

		try {
			await mutateAddMessage({
				variables: {
					channelId,
					text: message,
					userId,
				},
				onCompleted: ({ MessagePost }) => {
					console.log(MessagePost);

					if (!MessagePost) {
						throw new Error('MessagePost is null');
					}
					replaceMessage(beforeMessage.messageId, MessagePost);
				},
				onError: () => {
					updateMessageStatus(beforeMessage.messageId, MessageStatus.Failed);
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleRetryMessage = async (message: MessageEnum) => {
		updateMessageStatus(message.messageId, MessageStatus.Sending);

		try {
			await mutateAddMessage({
				variables: {
					channelId,
					text: message.text,
					userId,
				},
				onCompleted: ({ MessagePost }) => {
					if (!MessagePost) {
						throw new Error('MessagePost is null');
					}
					replaceMessage(message.messageId, MessagePost);
				},
				onError: () => {
					updateMessageStatus(message.messageId, MessageStatus.Failed);
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return {
		handleAddMessage,
		handleRetryMessage,
	};
};

export default useSendMessage;
