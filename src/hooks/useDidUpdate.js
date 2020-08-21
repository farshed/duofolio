import { useRef, useLayoutEffect } from 'react';

export default function useDidUpdate(func, vibeCheck) {
	const didMountRef = useRef(false);
	useLayoutEffect(() => {
		if (didMountRef.current) func();
		else didMountRef.current = true;
	}, vibeCheck);
}
