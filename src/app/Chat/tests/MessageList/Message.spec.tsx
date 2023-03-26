import { UserId } from '@/libs/api/generated/graphql';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import Message, { MessageProps } from '../../MessageList/Message';

describe('Message', () => {
	const props: MessageProps = {
		userType: 'me',
		datetime: new Date().toISOString(),
		messageId: '1',
		text: 'Hello',
		userId: UserId.Joyse,
	};

	it('should render successfully', () => {
		const { baseElement } = render(<Message {...props} />);
		expect(baseElement).toBeTruthy();
	});

	it('should render successfully with message', () => {
		render(<Message {...props} />);
		const paragraph = screen.getByText('Hello');
		expect(paragraph).toBeTruthy();
	});

	it('should render successfully with message time', () => {
		render(<Message {...props} />);
		const time = moment(props.datetime).format('HH:mm');
		const paragraph = screen.getByText(time);
		expect(paragraph).toBeTruthy();
	});
});
