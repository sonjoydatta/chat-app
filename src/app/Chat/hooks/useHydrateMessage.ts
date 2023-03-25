import { LocalStorageService } from '@/services';
import { useCallback, useEffect } from 'react';

const storageService = new LocalStorageService();

interface UseHydrateMessage {
	storageKey: string;
	textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const useHydrateMessage = ({ storageKey, textareaRef }: UseHydrateMessage) => {
	// Hydrate textarea with message from local storage
	useEffect(() => {
		const message = storageService.get(storageKey);
		if (message) {
			textareaRef.current!.value = message as string;
			storageService.remove(storageKey);
		}
	}, [storageKey, textareaRef]);

	const handleAddToStorage = useCallback(() => {
		const message = textareaRef.current?.value?.trim();
		if (message) {
			storageService.set(storageKey, message);
		}
	}, [storageKey, textareaRef]);

	const handleRemoveFromStorage = useCallback(() => {
		storageService.remove(storageKey);
	}, [storageKey]);

	return {
		storageKey,
		handleAddToStorage,
		handleRemoveFromStorage,
	};
};

export default useHydrateMessage;
