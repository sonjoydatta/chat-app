import { render, screen } from '@testing-library/react';
import MessageList from '../../MessageList';

describe('MessageList', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<MessageList loading empty>
				Message
			</MessageList>
		);
		expect(baseElement).toBeTruthy();
	});

	it('should render successfully with loading', () => {
		render(
			<MessageList loading empty={false}>
				Message
			</MessageList>
		);
		const paragraph = screen.getByText('Loading...');
		expect(paragraph).toBeTruthy();
	});

	it('should render successfully with empty', () => {
		render(
			<MessageList loading={false} empty>
				Message
			</MessageList>
		);
		const paragraph = screen.getByText('No messages');
		expect(paragraph).toBeTruthy();
	});

	it('should render successfully when not loading and not empty', () => {
		render(
			<MessageList loading={false} empty={false}>
				Message
			</MessageList>
		);
		const paragraph = screen.getByText('Message');
		expect(paragraph).toBeTruthy();
	});
});
