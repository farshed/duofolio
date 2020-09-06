export const primaryColor = '#0f2439';
export const elevatedBG = '#F7F8FB';
export const contrastColor = '#000000';

export const LANG = {
	SPANISH: 'es-ES',
	FRENCH: 'fr-FR',
	GERMAN: 'de-DE',
	DUTCH: 'nl-NL',
	SWEDISH: 'sv-SV',
	NORWEGIAN: 'no-NO',
	RUSSIAN: 'ru-RU',
	ITALIAN: 'it-IT',
	PORTUGUESE: 'pt-PT'
};

export const languages = [
	{
		label: 'French',
		value: LANG.FRENCH,
		image: require('../../assets/images/fr.png')
	},
	{
		label: 'Spanish',
		value: LANG.SPANISH,
		image: require('../../assets/images/es.png')
	},
	{
		label: 'Russian',
		value: LANG.RUSSIAN,
		image: require('../../assets/images/ru.png')
	},
	{
		label: 'Dutch',
		value: LANG.DUTCH,
		image: require('../../assets/images/nl.png')
	}
];

export const settings = [
	{
		id: 'bg',
		text: 'Theme',
		title: 'Choose theme',
		items: [
			{ label: 'Light', value: '#fafafa' },
			{ label: 'Dark', value: '#121212' },
			{ label: 'Classic', value: '#f8f1e3' },
			{ label: 'Silver', value: '#bebebe' },
			{ label: 'Grey', value: '#5a5a5c' }
		]
	},
	{
		id: 'language',
		text: 'Language',
		title: 'Choose language',
		items: languages
	},
	// {
	// 	id: 'flow',
	// 	text: 'Page Flow',
	// 	title: 'Choose page flow',
	// 	items: [
	// 		{
	// 			label: 'Paginated',
	// 			value: 'paginated'
	// 		},
	// 		{
	// 			label: 'Scroll',
	// 			value: 'scrolled-doc'
	// 		}
	// 	]
	// },
	{
		id: 'size',
		text: 'Font Size',
		title: 'Choose font size',
		items: [
			{ label: '15', value: '15px' },
			{ label: '16', value: '16px' },
			{ label: '17', value: '17px' },
			{ label: '18', value: '18px' },
			{ label: '19', value: '19px' },
			{ label: '20', value: '20px' },
			{ label: '21', value: '21px' },
			{ label: '22', value: '22px' },
			{ label: '23', value: '23px' },
			{ label: '24', value: '24px' }
		]
	},
	{
		id: 'height',
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
