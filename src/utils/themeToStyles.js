import { store } from '../store';

let styles = {
	body: {
		background: '#fafafa',
		color: '#121212',
		'font-family': 'Default',
		'font-size': '100%',
		'line-height': 'normal'
	},
	p: {
		color: '#ffffff',
		'font-family': 'Default',
		'font-size': '100%',
		'line-height': 'normal'
	},
	li: {
		color: '#ffffff',
		'font-family': 'Default',
		'font-size': '100%',
		'line-height': 'normal'
	},
	h1: {
		color: '#ffffff'
	}
};

export default function(theme) {
	let fgColor = lightOrDark(theme.bg) === 'light' ? '#000000' : '#ffffff';

	styles.body = {
		background: theme.bg,
		color: fgColor,
		'font-family': theme.font,
		'font-size': theme.size,
		'line-height': theme.height
	};
	styles.p = {
		color: fgColor,
		'font-family': theme.font,
		'font-size': theme.size,
		'line-height': theme.height
	};
	styles.li = {
		color: fgColor,
		'font-family': theme.font,
		'font-size': theme.size,
		'line-height': theme.height
	};
	styles.h1.color = fgColor;

	if (store.getState().settings.fg !== fgColor) {
		store.dispatch({ type: 'modify_settings', payload: { fg: fgColor } });
	}

	return styles;
}

function lightOrDark(color) {
	let r, g, b, hsp;

	// check if color is rgba or hex
	if (color.match(/^rgb/)) {
		color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
		r = color[1];
		g = color[2];
		b = color[3];
	} else {
		color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
		r = color >> 16;
		g = (color >> 8) & 255;
		b = color & 255;
	}

	// check if color is light or dark
	hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
	return hsp > 127.5 ? 'light' : 'dark';
}
