import { ReactComponent as CheckCircle } from '@/assets/icons/check-circle.svg';
import { ReactComponent as ExclamationCircle } from '@/assets/icons/exclamation-circle.svg';
import { MessageStatus as StatusEnum } from '../ChatContext';

export interface MessageStatusProps {
	status?: StatusEnum;
	onRetry?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MessageStatus: React.FC<MessageStatusProps> = ({ status, onRetry }) => {
	if (status === StatusEnum.Sending) {
		return <p className='text-xs text-gray-500'>Sending...</p>;
	}

	if (status === StatusEnum.Failed) {
		return (
			<div className='flex items-center gap-1'>
				<button className='text-xs text-red-500' onClick={onRetry}>
					Retry
				</button>
				<ExclamationCircle />
			</div>
		);
	}

	return (
		<div className='flex items-center gap-1'>
			<p className='text-xs text-gray-500'>Sent</p>
			<CheckCircle />
		</div>
	);
};

export default MessageStatus;
