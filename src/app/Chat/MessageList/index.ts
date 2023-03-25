import Message, { MessageProps } from './Message';
import InternalMessageList, { MessageListProps } from './MessageList';
import MessageLoadMore from './MessageLoadMore';

type InternalMessageListType = typeof InternalMessageList;

export interface MessageListInterface extends InternalMessageListType {
	Item: typeof Message;
	LoadMore: typeof MessageLoadMore;
}

const MessageList = InternalMessageList as MessageListInterface;

MessageList.Item = Message;
MessageList.LoadMore = MessageLoadMore;

export default MessageList;
export type { MessageListProps, MessageProps };
