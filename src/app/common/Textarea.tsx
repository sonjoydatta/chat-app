import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...rest }, ref) => (
	<textarea
		ref={ref}
		className={twMerge(
			[
				'w-full',
				'flex-1',
				'px-4',
				'py-2',
				'text-gray-700',
				'bg-white',
				'border-none',
				'resize-none',
				'rounded-md',
				'focus:outline-none',
				'focus:ring-2',
			],
			className
		)}
		{...rest}
	/>
));

export default Textarea;
