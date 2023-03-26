import { render, screen } from '@testing-library/react';
import MessageLoadMore from '../../MessageList/MessageLoadMore';

describe('MessageLoadMore', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MessageLoadMore next visible />);
		expect(baseElement).toBeTruthy();
	});

	it('should render with text', () => {
		render(<MessageLoadMore next visible />);
		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('Read More');
	});

	it('should return null if not visible', () => {
		const { container } = render(<MessageLoadMore next visible={false} />);
		expect(container).toBeEmptyDOMElement();
	});
});
