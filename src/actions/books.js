import RNFileSelector from 'react-native-file-selector';
import { getStoragePermission, checkStoragePermissions } from '../utils/permissions';
import showToast from '../components/Toast';

export const addBook = () => async (dispatch) => {
	let granted = await checkStoragePermissions();
	if (!granted) await getStoragePermission();
	RNFileSelector.Show({
		title: 'Select epub file',
		filter: '.*\\.(epub|EPUB)$',
		onDone: (url) => {
			let components = url.split('/');
			let file = components[components.length - 1].split('.');
			if (file[file.length - 1] !== 'epub') {
				return showToast('Invalid file. Only "epub" files are allowed');
			}
			dispatch({
				type: 'add_books',
				payload: { title: file[0], url }
			});
		},
		onCancel: () => {}
	});
};
