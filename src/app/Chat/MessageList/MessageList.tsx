import { forwardRef } from 'react';

export interface MessageListProps {
	children: React.ReactNode;
	loading: boolean;
	empty: boolean;
}

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
	({ children, loading, empty }, ref) => (
		<div ref={ref} className='flex flex-col flex-1 p-4 overflow-y-auto'>
			<div className='flex flex-col-reverse gap-4'>
				{loading && <p className='text-center'>Loading...</p>}

				{!loading && empty && <p className='text-center'>No messages</p>}

				{!loading && !empty && children}
			</div>
		</div>
	)
);

export default MessageList;
