import { twMerge } from 'tailwind-merge';

type SelectOption = {
	value: string;
	label: string;
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options: SelectOption[];
}

const Select: React.FC<SelectProps> = ({ options = [], className, ...rest }) => (
	<select
		className={twMerge(
			[
				'w-full',
				'min-h-[38px]',
				'py-1.5',
				'px-3',
				'bg-white',
				'border',
				'border-slate-300',
				'rounded-md',
				'focus:outline-none',
			],
			className
		)}
		{...rest}
	>
		{options.map((option) => (
			<option key={option.value} value={option.value}>
				{option.label}
			</option>
		))}
	</select>
);

export default Select;
