export const goBack = (navigate: any) => {
	navigate('..', { relative: 'path' });
};

export const handleItem = (key: string, value?: string): void => {
	if (value) {
		localStorage.setItem(key, value);
	} else {
		localStorage.removeItem(key);
	}
};
