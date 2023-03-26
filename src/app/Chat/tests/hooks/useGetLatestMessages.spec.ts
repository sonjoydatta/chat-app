import { ChannelId, UserId } from '@/libs/api/generated/graphql';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetLatestMessages } from '../../hooks';

const mockData = {
	MessagesFetchLatest: [
		{
			messageId: '1',
			text: 'Hello world',
			datetime: new Date().toISOString(),
			userId: UserId.Joyse,
		},
	],
};

jest.mock('@apollo/client', () => ({
	...jest.requireActual('@apollo/client'),
	useQuery: () => ({
		data: mockData,
	}),
}));

describe('useGetLatestMessages', () => {
	it('should get latest messages', async () => {
		const { result } = renderHook(() =>
			useGetLatestMessages({
				channelId: ChannelId.General,
				setMessages: jest.fn(),
				scrollToBottom: jest.fn(),
			})
		);

		await waitFor(() => {
			expect(result.current.data).toEqual(mockData);
		});
	});
});
