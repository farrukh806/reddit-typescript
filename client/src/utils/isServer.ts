export const isServer = () => {
	// console.log('window: ', window);
	if (typeof window === 'undefined') {
		return true;
	}
	return false;
};
