import { ReactComponent as PaperPlane } from '@/assets/icons/paper-plane.svg';
import { forwardRef } from 'react';
import { Button, Textarea } from '../common';

interface MessageInputProps {
	onTextChange: (text: string) => void;
	onAddMessage: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(
	({ onTextChange, onAddMessage }, ref) => (
		<div className='flex flex-col border-t p-4'>
			<Textarea
				rows={4}
				ref={ref}
				onChange={(e) => onTextChange(e.target.value)}
				placeholder='Type your message here...'
			/>
			<Button
				icon={PaperPlane}
				className='w-40 mt-4'
				buttonText='Send Message'
				onClick={onAddMessage}
			/>
		</div>
	)
);

export default MessageInput;
