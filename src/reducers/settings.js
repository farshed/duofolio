import mapBgToFg from '../utils/mapBgToFg';

const InitialState = {
	bg: '#fafafa',
	fg: '#000000',
	size: '100%',
	height: 'normal',
	sLang: '',
	tLang: ''
	// flow: '',
};

export default function(state = InitialState, action) {
	switch (action.type) {
		case 'modify_settings':
			if (action.payload.bg) {
				return { ...state, ...action.payload, fg: mapBgToFg(action.payload.bg) };
			}
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
