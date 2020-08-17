import { ToastAndroid } from 'react-native';

export default function RenderToast(message) {
	ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 300);
}
