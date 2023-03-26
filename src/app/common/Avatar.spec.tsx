import { render } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
	it('should have a default image if no image is provided', () => {
		const { getByRole } = render(<Avatar />);
		const image = getByRole('img');
		expect(image).toHaveAttribute('src', '/default-avatar.png');
	});
});
