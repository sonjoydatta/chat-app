import { ReactComponent as CheckCircle } from '@/assets/icons/check-circle.svg';
import { ReactComponent as ExclamationCircle } from '@/assets/icons/exclamation-circle.svg';
import { MessageEnum } from '@/libs/api/generated/graphql';
import moment from 'moment';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Avatar } from '../common';

interface MessageProps extends MessageEnum {
	userType: 'me' | 'other';
	userAvatar?: string;
	failed?: boolean;
	loading?: boolean;
}

const Message: React.FC<MessageProps> = ({
	userType,
	userAvatar,
	userId,
	text,
	datetime,
	failed,
	loading,
}) => {
	const isMe = userType === 'me';

	return (
		<div
			className={twMerge(
				['flex flex-row items-center mb-4'],
				isMe ? 'justify-end' : 'justify-start'
			)}
		>
			<div className={twMerge(['flex gap-5'], isMe ? 'justify-end' : 'justify-start')}>
				<div
					className={twMerge(
						['flex items-center flex-col min-w-[48px]'],
						isMe ? 'order-last' : 'order-first'
					)}
				>
					<Avatar src={userAvatar} />
					<p className='text-xs text-gray-500 mt-1'>{userId}</p>
				</div>

				<div className='bg-white max-w-[70%] p-4 rounded-lg relative'>
					<div
						className={twMerge(
							['absolute w-4 h-4 bg-white transform -rotate-45'],
							isMe ? ['right-0 translate-x-1/2'] : ['left-0 -translate-x-1/2']
						)}
					/>
					<p className='text-sm'>{text}</p>
				</div>

				<div
					className={twMerge(
						['flex flex-col gap-1'],
						isMe ? ['items-end order-first'] : ['items-start order-last']
					)}
				>
					<p className='text-xs text-gray-500'>{moment(datetime).format('HH:mm')}</p>
					{isMe && (
						<p className='text-xs text-gray-500'>
							{failed && !loading ? <ExclamationCircle /> : <CheckCircle />}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Message);
