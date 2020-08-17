import RNFileSelector from 'react-native-file-selector';
import { getStoragePermission, checkStoragePermissions } from '../utils/permissions';
import showToast from '../components/Toast';

export const addBooks = () => async (dispatch) => {
	let granted = await checkStoragePermissions();
	if (!granted) await getStoragePermission();
	RNFileSelector.Show({
		title: 'Select book (epub)',
		onDone: (path) => {
			let components = path.split('/');
			let file = components[components.length - 1].split('.');
			if (file[file.length - 1] !== 'epub') {
				return showToast('Invalid file. Only "epub" files are allowed');
			}
			dispatch({
				type: 'add_books',
				payload: { title: file[0], url: `file://${path}` }
			});
		},
		onCancel: () => {}
	});
};
