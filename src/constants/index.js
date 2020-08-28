export const primaryColor = '#0f2439';
export const elevatedBG = '#F7F8FB';
export const contrastColor = '#000000';

export const LANG = {
	SPANISH: 'es-ES',
	FRENCH: 'fr-FR',
	DUTCH: 'nl-NL',
	RUSSIAN: 'ru-RU'
};

export const languages = [
	{
		label: 'French',
		value: { language: LANG.FRENCH },
		image: require('../../assets/images/france.png')
	},
	{
		label: 'Spanish',
		value: { language: LANG.SPANISH },
		image: require('../../assets/images/spain.png')
	},
	{
		label: 'Russian',
		value: { language: LANG.RUSSIAN },
		image: require('../../assets/images/russia.png')
	},
	{
		label: 'Dutch',
		value: { language: LANG.DUTCH },
		image: require('../../assets/images/netherlands.png')
	}
];

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
		items: languages
	},
	{
		text: 'Page Flow',
		title: 'Choose page flow',
		items: [
			{
				label: 'Paginated',
				value: { flow: '' }
			},
			{
				label: 'Scroll',
				value: { flow: '' }
			}
		]
	},
	{
		text: 'Font Family',
		title: 'Choose font',
		items: [
			{ label: 'Arial', value: { font: 'Arial' } },
			{ label: 'Baskervville', value: { font: "'Baskervville', serif" } },
			{ label: 'Calson', value: { font: "'Libre Caslon Text', serif" } },
			{ label: 'Lora', value: { font: "'Lora', serif" } },
			{ label: 'Raleway', value: { font: "'Raleway', sans-serif" } },
			{ label: 'Roboto', value: { font: "'Roboto', sans-serif" } },
			{ label: 'Special Elit', value: { font: "'Special Elite'" } }
		]
	},
	{
		text: 'Font Size',
		title: 'Choose font size',
		items: [
			{ label: '15', value: { size: '15px' } },
			{ label: '16', value: { size: '16px' } },
			{ label: '17', value: { size: '17px' } },
			{ label: '18', value: { size: '18px' } },
			{ label: '19', value: { size: '19px' } },
			{ label: '20', value: { size: '20px' } },
			{ label: '21', value: { size: '21px' } },
			{ label: '22', value: { size: '22px' } },
			{ label: '23', value: { size: '23px' } },
			{ label: '24', value: { size: '24px' } }
		]
	},
	{
		text: 'Line Height',
		title: 'Choose line height',
		items: [
			{ label: '1.4', value: { height: 1.4 } },
			{ label: '1.6', value: { height: 1.6 } },
			{ label: '1.8', value: { height: 1.8 } },
			{ label: '2.0', value: { height: 2.0 } },
			{ label: '2.2', value: { height: 2.2 } },
			{ label: '2.4', value: { height: 2.4 } }
		]
	}
];
