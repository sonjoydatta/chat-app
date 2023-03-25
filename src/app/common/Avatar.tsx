import { twMerge } from 'tailwind-merge';

export type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Avatar: React.FC<AvatarProps> = ({ src, alt, className, ...props }) => (
	<img
		{...props}
		src={src || '/default-avatar.png'}
		alt={alt}
		className={twMerge(['w-12 h-12 rounded-full'], className)}
	/>
);

export default Avatar;
