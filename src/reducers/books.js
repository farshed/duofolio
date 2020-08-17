const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'add_books':
			return [...state, action.payload];
		default:
			return state;
	}
}
