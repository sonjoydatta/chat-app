import { Button, ButtonProps } from '@/app/common';
import { ReactComponent as ArrowDown } from '@/assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from '@/assets/icons/arrow-up.svg';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

export interface MessageLoadMore extends Omit<ButtonProps, 'buttonText' | 'icon'> {
	next: boolean;
	visible: boolean;
}

const MessageLoadMore: React.FC<MessageLoadMore> = ({ next, visible, className, ...rest }) => {
	if (!visible) return null;

	return (
		<Button
			{...rest}
			buttonText='Read More'
			icon={next ? ArrowDown : ArrowUp}
			className={twMerge(['w-32 mt-4'], className)}
		/>
	);
};

export default memo(MessageLoadMore);
