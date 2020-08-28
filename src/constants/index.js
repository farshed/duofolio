export const primaryColor = '#0f2439';
export const elevatedBG = '#F7F8FB';
export const contrastColor = '#000000';

export const settings = [
	{
		text: 'Themes',
		title: 'Choose theme',
		items: [
			{ label: 'Light (default)', value: { bg: '#fafafa', fg: '#000000' } },
			{ label: 'Dark', value: { bg: '#121212', fg: '#ffffff' } },
			{ label: 'Classic', value: { bg: '#f8f1e3', fg: '#000000' } },
			{ label: 'Silver', value: { bg: '#bebebe', fg: '#000000' } },
			{ label: 'Grey', value: { bg: '#5a5a5c', fg: '#ffffff' } }
		]
	},
	{
		text: 'Language',
		title: 'Choose language',
		items: [
			{ label: 'Spanish', value: 'es-ES' },
			{ label: 'French', value: 'fr-FR' },
			{ label: 'Dutch', value: 'nl-NL' },
			{ label: 'Russian', value: 'ru-RU' }
		]
	},
	{
		text: 'Page Flow',
		title: 'Choose page flow',
		items: [{ label: 'Paginated', value: '' }, { label: 'Scroll', value: '' }]
	},
	{
		text: 'Font Family',
		title: 'Choose font',
		items: [
			{ label: 'Arial', value: 'Arial' },
			{ label: 'Baskervville', value: "'Baskervville', serif" },
			{ label: 'Calson', value: "'Libre Caslon Text', serif" },
			{ label: 'Lora', value: "'Lora', serif" },
			{ label: 'Raleway', value: "'Raleway', sans-serif" },
			{ label: 'Roboto', value: "'Roboto', sans-serif" },
			{ label: 'Special Elit', value: "'Special Elite'" }
		]
	},
	{
		text: 'Font Size',
		title: 'Choose font size',
		items: [
			{ label: '12', value: '12' },
			{ label: '13', value: '13' },
			{ label: '14', value: '14' },
			{ label: '15', value: '15' },
			{ label: '16', value: '16' },
			{ label: '17', value: '17' },
			{ label: '18', value: '18' },
			{ label: '19', value: '19' },
			{ label: '20', value: '20' }
		]
	},
	{
		text: 'Line Height',
		title: 'Choose line height',
		items: [
			{ label: '1.4', value: 1.4 },
			{ label: '1.6', value: 1.6 },
			{ label: '1.8', value: 1.8 },
			{ label: '2.0', value: 2.0 },
			{ label: '2.2', value: 2.2 },
			{ label: '2.4', value: 2.4 }
		]
	}
];

export const languages = [
	{ name: 'Spanish', image: require('../../assets/images/spain.png') },
	{ name: 'French', image: require('../../assets/images/france.png') },
	{ name: 'Dutch', image: require('../../assets/images/netherlands.png') },
	{ name: 'Russian', image: require('../../assets/images/russia.png') }
];
