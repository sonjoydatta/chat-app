import { ReactComponent as ArrowDown } from '@/assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from '@/assets/icons/arrow-up.svg';
import { GET_LATEST_MESSAGES, GET_MORE_MESSAGES } from '@/libs/api/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Button } from '../common';
import { useChatContext } from './ChatContext';
import Message from './Message';

const MessageList = () => {
	const { userId, channelId, messages, setMessages } = useChatContext();
	const [isPreviousBtnVisible, setPreviousBtnVisible] = useState(true);
	const [isNextBtnVisible, setNextBtnVisible] = useState(true);

	const { loading } = useQuery(GET_LATEST_MESSAGES, {
		variables: {
			channelId,
		},
		onCompleted: ({ MessagesFetchLatest }) => {
			if (MessagesFetchLatest && MessagesFetchLatest?.length > 0) {
				setMessages(MessagesFetchLatest);
			}
		},
	});

	const [fetchMore] = useLazyQuery(GET_MORE_MESSAGES);

	const firstMessageId = useMemo(() => messages[0]?.messageId, [messages]);
	const lastMessageId = useMemo(() => messages[messages.length - 1]?.messageId, [messages]);

	const handleReadMore = useCallback(
		async (old: boolean) => {
			await fetchMore({
				variables: {
					channelId,
					messageId: old ? firstMessageId : lastMessageId,
					old,
				},
				onCompleted: ({ MessagesFetchMore }) => {
					if (MessagesFetchMore && MessagesFetchMore?.length > 0) {
						setMessages(MessagesFetchMore, old);
					} else if (old) {
						setPreviousBtnVisible(false);
					} else {
						setNextBtnVisible(false);
					}
				},
			});
		},
		[channelId, fetchMore, firstMessageId, lastMessageId, setMessages]
	);

	return (
		<div className='flex flex-col flex-1 p-4 overflow-y-auto'>
			<div className='flex flex-col-reverse gap-4'>
				{loading ? (
					<p>Loading...</p>
				) : (
					<Fragment>
						{isNextBtnVisible && (
							<Button
								buttonText='Read More'
								icon={ArrowDown}
								className='w-32 mt-4'
								onClick={() => handleReadMore(false)}
							/>
						)}

						{messages.map((message) => (
							<Message
								key={message.messageId}
								{...{
									...message,
									userType: message.userId === userId ? 'me' : 'other',
								}}
							/>
						))}

						{isPreviousBtnVisible && (
							<Button
								buttonText='Read More'
								icon={ArrowUp}
								className='w-32 mb-4'
								onClick={() => handleReadMore(true)}
							/>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default MessageList;
