import { GET_MORE_MESSAGES } from '@/libs/api/queries';
import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import { ChatContextType } from '../ChatContext';

interface UseGetMoreMessages
	extends Required<Pick<ChatContextType, 'messages' | 'channelId' | 'setMessages'>> {
	scrollToTop: () => void;
	scrollToBottom: () => void;
	setBtnVisible: React.Dispatch<
		React.SetStateAction<{
			prev: boolean;
			next: boolean;
		}>
	>;
}

const useGetMoreMessages = ({
	scrollToTop,
	scrollToBottom,
	channelId,
	messages,
	setMessages,
	setBtnVisible,
}: UseGetMoreMessages) => {
	const [fetchMore] = useLazyQuery(GET_MORE_MESSAGES);

	const scrollTo = useCallback(
		(old: boolean) => {
			if (old) {
				scrollToTop();
			} else {
				scrollToBottom();
			}
		},
		[scrollToBottom, scrollToTop]
	);

	return async (old: boolean) => {
		const firstMessageId = messages[0]?.messageId;
		const lastMessageId = messages[messages.length - 1]?.messageId;

		if (!firstMessageId || !lastMessageId) return;

		const variables = {
			channelId,
			messageId: old ? firstMessageId : lastMessageId,
			old,
		};

		try {
			await fetchMore({
				variables,
				onCompleted: ({ MessagesFetchMore }) => {
					if (MessagesFetchMore && MessagesFetchMore?.length > 0) {
						setMessages(MessagesFetchMore, old);
					} else if (old) {
						setBtnVisible((prev) => ({ ...prev, prev: false }));
					} else {
						setBtnVisible((prev) => ({ ...prev, next: false }));
					}
					scrollTo(old);
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export default useGetMoreMessages;
