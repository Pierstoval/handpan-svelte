import type Track from './Track';
import type TrackNote from './TrackNote';

const soundFiles = {
	clac: 'clac/clac.flac',
	gu: 'gu/D2.flac',
	notes: {
		E2: 'shellopan/E2.flac',
		F2: 'shellopan/F2.flac',
		'F#2': 'shellopan/Fs2.flac',
		G2: 'shellopan/G2.flac',
		'G#2': 'shellopan/Gs2.flac',
		A2: 'shellopan/A2.flac',
		'A#2': 'shellopan/As2.flac',
		B2: 'shellopan/B2.flac',
		C3: 'shellopan/C3.flac',
		'C#3': 'shellopan/Cs3.flac',
		D3: 'shellopan/D3.flac',
		'D#3': 'shellopan/Ds3.flac',
		E3: 'shellopan/E3.flac',
		F3: 'shellopan/F3.flac',
		'F#3': 'shellopan/Fs3.flac',
		G3: 'shellopan/G3.flac',
		'G#3': 'shellopan/Gs3.flac',
		A3: 'shellopan/A3.flac',
		'A#3': 'shellopan/As3.flac',
		B3: 'shellopan/B3.flac',
		C4: 'shellopan/C4.flac',
		'C#4': 'shellopan/Cs4.flac',
		D4: 'shellopan/D4.flac',
		'D#4': 'shellopan/Ds4.flac',
		E4: 'shellopan/E4.flac',
		F4: 'shellopan/F4.flac',
		'F#4': 'shellopan/Fs4.flac',
		G4: 'shellopan/G4.flac',
		'G#4': 'shellopan/Gs4.flac',
		A4: 'shellopan/A4.flac',
		'A#4': 'shellopan/As4.flac',
		B4: 'shellopan/B4.flac',
		C5: 'shellopan/C5.flac',
		'C#5': 'shellopan/Cs5.flac',
		D5: 'shellopan/D5.flac',
		'D#5': 'shellopan/Ds5.flac',
		E5: 'shellopan/E5.flac',
		F5: 'shellopan/F5.flac',
		'F#5': 'shellopan/Fs5.flac',
		G5: 'shellopan/G5.flac',
		'G#5': 'shellopan/Gs5.flac',
		A5: 'shellopan/A5.flac'
	}
};

export default class Player {
	public static readonly DEFAULT_AUDIO_DURATION = 300;

	private static _isPlaying = false;

	private static loadedAudio = {};

	private static playingTimeouts: Array<ReturnType<typeof setTimeout>> = [];

	private static playingNotes: Array<TrackNote> = [];

	static get isPlaying(): boolean {
		return this._isPlaying;
	}

	public static loadAudioFiles(): void {
		this.loadAudioFile('clac', soundFiles.clac);
		this.loadAudioFile('gu', soundFiles.gu);
		for (const note in soundFiles.notes) {
			this.loadAudioFile(note, soundFiles.notes[note]);
		}
	}

	public static playTrack(track: Track, finishCallback: () => unknown): void {
		this.stop();

		this._isPlaying = true;

		const msPerBeat = this.getMsPerBeat(track.bpm, track.beat);

		let currentTimeoutDuration = msPerBeat;

		// Schedule each note to be executed at the proper time.
		track.notes.forEach((note: TrackNote) => {
			this.addPlayingTimeout(() => Player.playNote(note), currentTimeoutDuration);

			currentTimeoutDuration += msPerBeat;
		});

		if (finishCallback) {
			// Callback is executed *before* "this.stop",
			// to avoid the finish callback being removed
			// when the player is stopped naturally when
			// the track finishes.
			this.addPlayingTimeout(finishCallback, currentTimeoutDuration);
		}

		// And finally stop the player.
		this.addPlayingTimeout(() => this.stop(), currentTimeoutDuration);
	}

	public static stop(): void {
		// Stop all timeouts and remove them from the player.
		while (this.playingTimeouts.length) {
			clearTimeout(this.playingTimeouts.shift());
		}

		// Play down all notes and remove them from the player.
		while (this.playingNotes.length) {
			this.playingNotes.shift().stopPlaying();
		}

		this.playingTimeouts = [];
		this.playingNotes = [];

		this._isPlaying = false;
	}

	public static playNoteByType(
		type: string,
		volume = 1,
		finishCallback: () => unknown = null
	): void {
		if (!this.loadedAudio[type]) {
			console.error(`Sound type "${type}" s not loaded or does not exist.`);
			return;
		}

		// Must be cloned to make sure it can be played several times in parallel.
		// This allows playing the same audio twice in a row without having to wait
		// for it to be stopped before restarting it.
		const audio = this.loadedAudio[type].cloneNode();
		audio.volume = volume;
		audio.play();

		if (finishCallback) {
			const duration = isNaN(audio.duration) ? this.DEFAULT_AUDIO_DURATION : audio.duration;
			this.addPlayingTimeout(finishCallback, duration);
		}
	}

	public static playNote(note: TrackNote): void {
		note.setPlaying();

		this.playingNotes.push(note);

		switch (true) {
			case note.isSlap:
				this.playNoteByType('clac', 1, () => this.stopNote(note));
				break;

			case note.isGhost:
				this.playNoteByType('clac', 1, () => this.stopNote(note));
				break;

			case note.isNone:
				break;

			default:
				this.playNoteByType(note.displayName, 1, () => this.stopNote(note));
				break;
		}
	}

	private static stopNote(note: TrackNote): void {
		note.stopPlaying();

		this.playingNotes = this.playingNotes.filter((n: TrackNote) => n !== note);
	}

	private static getMsPerBeat(bpm: number, beat: number) {
		return (1000 * 60) / bpm / beat;
	}

	private static addPlayingTimeout(callback: () => unknown, time: number): void {
		this.playingTimeouts.push(setTimeout(callback, time));
	}

	private static loadAudioFile(type: string, soundFile: string): void {
		const audio = new Audio();
		audio.src = soundFile;
		audio.preload = 'auto';
		audio.volume = 1;
		audio.addEventListener('canplaythrough', () => (this.loadedAudio[type] = audio));
	}
}
