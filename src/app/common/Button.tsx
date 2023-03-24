import { twMerge } from 'tailwind-merge';

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
	buttonText: string;
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Button: React.FC<ButtonProps> = ({ buttonText, icon, className, ...rest }) => {
	const ButtonIcon = icon;

	return (
		<button
			className={twMerge([
				'flex',
				'items-center',
				'justify-center',
				'min-h-[38px]',
				'px-3',
				'text-sm',
				'font-medium',
				'text-white',
				'rounded-md',
				'border',
				'border-primary',
				'bg-primary',
				'hover:bg-primary-dark',
				'focus:outline-none',
				className,
			])}
			{...rest}
		>
			<span className='mr-2'>{buttonText}</span>
			{ButtonIcon && <ButtonIcon />}
		</button>
	);
};

export default Button;
