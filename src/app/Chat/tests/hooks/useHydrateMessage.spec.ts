import { LocalStorageService } from '@/services';
import { act, renderHook, waitFor } from '@testing-library/react';
import useHydrateMessage from '../../hooks/useHydrateMessage';

describe('useHydrateMessage', () => {
	it('should hydrate message from local storage', async () => {
		jest.spyOn(LocalStorageService.prototype, 'get').mockReturnValue('A message');

		const mockTextareaRef = {
			current: {
				value: '',
			},
		} as React.RefObject<HTMLTextAreaElement>;

		renderHook(() =>
			useHydrateMessage({
				storageKey: 'test',
				textareaRef: mockTextareaRef,
			})
		);

		await waitFor(() => {
			expect(mockTextareaRef.current!.value).toBe('A message');
		});
	});

	it('should add message to storage', () => {
		const mockTextareaRef = {
			current: {
				value: 'A message',
			},
		} as React.RefObject<HTMLTextAreaElement>;

		const { result } = renderHook(() =>
			useHydrateMessage({
				storageKey: 'test',
				textareaRef: mockTextareaRef,
			})
		);

		act(() => {
			result.current.handleAddToStorage();
		});

		expect(mockTextareaRef.current!.value).toBe('A message');
	});

	it('should call remove message function', () => {
		const mockRemove = jest.fn();
		const mockTextareaRef = {
			current: {
				value: '',
			},
		} as React.RefObject<HTMLTextAreaElement>;

		const { result } = renderHook(() =>
			useHydrateMessage({
				storageKey: 'test',
				textareaRef: mockTextareaRef,
			})
		);

		result.current.handleRemoveFromStorage = mockRemove;

		act(() => {
			result.current.handleRemoveFromStorage();
		});

		expect(mockRemove).toHaveBeenCalled();
	});
});
