import { useRef } from 'react';

const useScroll = <T extends HTMLElement = HTMLDivElement>() => {
	const elementRef = useRef<T>(null);

	const scrollToBottom = () => {
		if (elementRef.current) {
			elementRef.current.scrollTop = elementRef.current.scrollHeight;
		}
	};

	const scrollToTop = () => {
		if (elementRef.current) {
			elementRef.current.scrollTop = 0;
		}
	};

	return {
		elementRef,
		scrollToBottom,
		scrollToTop,
	};
};

export default useScroll;
