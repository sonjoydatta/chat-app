import { gql } from './generated';

export const GET_LATEST_MESSAGES = gql(/* GraphQL */ `
	query MessagesFetchLatest($channelId: ChannelId!) {
		MessagesFetchLatest(channelId: $channelId) {
			messageId
			text
			datetime
			userId
		}
	}
`);

export const GET_MORE_MESSAGES = gql(/* GraphQL */ `
	query MessagesFetchMore($channelId: ChannelId!, $messageId: String!, $old: Boolean!) {
		MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {
			messageId
			text
			datetime
			userId
		}
	}
`);
