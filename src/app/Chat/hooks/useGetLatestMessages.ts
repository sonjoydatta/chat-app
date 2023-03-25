import { GET_LATEST_MESSAGES } from '@/libs/api/queries';
import { useQuery } from '@apollo/client';
import { ChatContextType } from '../ChatContext';

interface UseGetLatestMessages
	extends Required<Pick<ChatContextType, 'channelId' | 'setMessages'>> {
	scrollToBottom: () => void;
}

const useGetLatestMessages = ({ channelId, setMessages, scrollToBottom }: UseGetLatestMessages) => {
	return useQuery(GET_LATEST_MESSAGES, {
		variables: { channelId },
		onCompleted: ({ MessagesFetchLatest }) => {
			if (MessagesFetchLatest && MessagesFetchLatest?.length > 0) {
				setMessages(MessagesFetchLatest);
				setTimeout(() => scrollToBottom(), 100);
			}
		},
	});
};

export default useGetLatestMessages;
