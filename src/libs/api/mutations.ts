import { gql } from './generated';

export const ADD_MESSAGE = gql(/* GraphQL */ `
	mutation MessagePost($channelId: ChannelId!, $text: String!, $userId: UserId!) {
		MessagePost(channelId: $channelId, text: $text, userId: $userId) {
			messageId
			text
			userId
		}
	}
`);
