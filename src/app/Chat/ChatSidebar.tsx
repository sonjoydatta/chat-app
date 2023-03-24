import { ChannelId, UserId } from '@/libs/api/generated/graphql';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { Select } from '../common';
import { useChatContext } from './ChatContext';

const USER_OPTIONS = Object.values(UserId).map((userId) => ({
	value: userId,
	label: userId,
}));

const CHANNEL_OPTIONS = Object.values(ChannelId);

const ChatSidebar = () => {
	const { userId, channelId, setUserId, setChannelId, setMessages } = useChatContext();

	const handleChannelClick = useCallback(
		(channelId: ChannelId) => {
			setChannelId(channelId);
			setMessages([]);
		},
		[setChannelId, setMessages]
	);

	return (
		<div className='flex flex-col w-[370px] h-full p-4 border-r'>
			<div className='flex flex-col mb-4'>
				<p className='mb-2'>1. Choose your user</p>
				<Select
					options={USER_OPTIONS}
					value={userId}
					onChange={(e) => setUserId(e.target.value as UserId)}
				/>
			</div>
			<div className='flex flex-col'>
				<p className='mb-2'>2. Choose your channel</p>
				<ul className='flex flex-col gap-2'>
					{CHANNEL_OPTIONS.map((channel) => (
						<li key={channel}>
							<div
								className={twMerge(
									['flex', 'items-center', 'gap-2', 'cursor-pointer', 'px-4', 'py-3', 'rounded-md'],
									channelId === channel && 'bg-white'
								)}
								onClick={() => handleChannelClick(channel)}
							>
								{channel} Channel
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ChatSidebar;
