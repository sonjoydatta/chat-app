import { fireEvent, render, screen } from '@testing-library/react';
import MessageInput from '../MessageInput';

describe('MessageInput', () => {
	const props = {
		onTextChange: jest.fn(),
		onAddMessage: jest.fn(),
	};

	it('should render successfully', () => {
		const { baseElement } = render(<MessageInput {...props} />);
		expect(baseElement).toBeTruthy();
	});

	it('should render successfully with textarea', () => {
		render(<MessageInput {...props} />);
		const textarea = screen.getByRole('textbox');
		expect(textarea).toBeTruthy();
	});

	it('should render successfully with button', () => {
		render(<MessageInput {...props} />);
		const button = screen.getByRole('button');
		expect(button).toBeTruthy();
	});

	it('should call onTextChange when text is changed', () => {
		render(<MessageInput {...props} />);
		const textarea = screen.getByRole('textbox');
		fireEvent.change(textarea!, { target: { value: 'Hello' } });
		expect(props.onTextChange).toHaveBeenCalled();
	});

	it('should call onAddMessage when button is clicked', () => {
		render(<MessageInput {...props} />);
		const button = screen.getByRole('button');
		fireEvent.click(button!);
		expect(props.onAddMessage).toHaveBeenCalled();
	});
});
