export interface Track {
	id: number;
	title: string;
	artist: string;
	album: string;
	duration: number;
	coverUrl: string;
	audioUrl: string;
	genre: string;
	year: number;
}

export const MOCK_TRACKS: Track[] = [
	{
		id: 1,
		title: 'Midnight Dreams',
		artist: 'Luna Eclipse',
		album: 'Nocturnal',
		duration: 245,
		coverUrl: 'https://picsum.photos/seed/track1/300/300',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
		genre: 'Electronic',
		year: 2023
	},
	{
		id: 2,
		title: 'Summer Vibes',
		artist: 'The Sunshine Band',
		album: 'Golden Days',
		duration: 198,
		coverUrl: 'https://picsum.photos/seed/track2/300/300',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
		genre: 'Pop',
		year: 2022
	},
	{
		id: 3,
		title: 'Urban Rhythm',
		artist: 'City Beats',
		album: 'Street Stories',
		duration: 212,
		coverUrl: 'https://picsum.photos/seed/track3/300/300',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
		genre: 'Hip-Hop',
		year: 2023
	},
	{
		id: 4,
		title: 'Acoustic Soul',
		artist: 'James Rivers',
		album: 'Unplugged Sessions',
		duration: 267,
		coverUrl: 'https://picsum.photos/seed/track4/300/300',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
		genre: 'Acoustic',
		year: 2021
	},
	{
		id: 5,
		title: 'Electric Storm',
		artist: 'Voltage',
		album: 'High Energy',
		duration: 189,
		coverUrl: 'https://picsum.photos/seed/track5/300/300',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
		genre: 'Rock',
		year: 2023
	},
	{
		id: 6,
		title: 'Jazz Cafe',
		artist: 'Smooth Trio',
		album: 'Late Night',
		duration: 301,
		coverUrl: 'https://picsum.photos/seed/track6/300/300',
		audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
		genre: 'Jazz',
		year: 2022
	}
];
