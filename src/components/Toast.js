import { ToastAndroid } from 'react-native';

export default function RenderToast(message) {
	ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 300);
}
