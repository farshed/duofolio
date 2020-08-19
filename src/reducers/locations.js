const InitialState = {};

export default function(state = InitialState, action) {
	switch (action.type) {
		case 'add_location': {
			let { key, cfi } = action.payload;
			state[key] = cfi;
			return { ...state };
		}
		default:
			return state;
	}
}
