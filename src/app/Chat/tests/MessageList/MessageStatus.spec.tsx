import { render, screen } from '@testing-library/react';
import { MessageStatus as StatusEnum } from '../../ChatContext';
import MessageStatus from '../../MessageList/MessageStatus';

describe('MessageStatus', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MessageStatus />);
		expect(baseElement).toBeTruthy();
	});

	it('should render successfully with status sending', () => {
		render(<MessageStatus status={StatusEnum.Sending} />);
		const paragraph = screen.getByText('Sending...');
		expect(paragraph).toBeTruthy();
	});

	it('should render successfully with status failed', () => {
		render(<MessageStatus status={StatusEnum.Failed} />);
		const paragraph = screen.getByText('Retry');
		expect(paragraph).toBeTruthy();
	});
});
