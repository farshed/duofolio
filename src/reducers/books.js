const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'add_books':
			return [action.payload, ...state];
		case 'add_metadata': {
			let { data, index } = action.payload;
			let stateCopy = [...state];
			stateCopy[index] = { ...stateCopy[index], ...data };
			return stateCopy;
		}
		case 'remove_book': {
			let newState = [...state];
			newState.splice(action.payload, 1);
			return newState;
		}
		case 'sort_book': {
			if (action.payload < 1) return state;
			let stateDup = [...state];
			let item = stateDup.splice(action.payload, 1);
			stateDup.unshift(...item);
			return stateDup;
		}
		default:
			return state;
	}
}
