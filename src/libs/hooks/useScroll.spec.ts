import { act, renderHook } from '@testing-library/react';
import useScroll from './useScroll';

describe('useScroll', () => {
	it('should scroll to bottom', () => {
		const mockScrollToBottom = jest.fn();

		const { result } = renderHook(() => useScroll());
		result.current.scrollToBottom = mockScrollToBottom;

		act(() => {
			result.current.scrollToBottom();
		});

		expect(mockScrollToBottom).toHaveBeenCalled();
	});

	it('should scroll to top', () => {
		const mockScrollToTop = jest.fn();

		const { result } = renderHook(() => useScroll());
		result.current.scrollToTop = mockScrollToTop;

		act(() => {
			result.current.scrollToTop();
		});

		expect(mockScrollToTop).toHaveBeenCalled();
	});
});
