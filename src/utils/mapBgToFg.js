export default function mapBgToFg(color) {
	color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
	let r = color >> 16;
	let g = (color >> 8) & 255;
	let b = color & 255;
	let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
	return hsp > 127.5 ? '#000000' : '#ffffff';
}
