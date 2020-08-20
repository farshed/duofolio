import { useRef, useEffect } from 'react';

export default function useDidUpdate(func, vibeCheck) {
	const didMountRef = useRef(false);
	useEffect(() => {
		if (didMountRef.current) func();
		else didMountRef.current = true;
	}, vibeCheck);
}
