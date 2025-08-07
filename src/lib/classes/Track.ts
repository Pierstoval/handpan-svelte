import type HandpanTune from './HandpanTune';
import TrackNote from './TrackNote';
import HandpanNote from '$lib/classes/HandpanNote';
import { TrackNoteType } from '$lib/classes/_structs';

export default class Track {
	public static readonly MIN_BPM = 50;
	public static readonly MAX_BPM = 200;

	public static readonly MIN_BEAT = 2;
	public static readonly MAX_BEAT = 8;

	private _notes: Array<TrackNote>;

	private readonly _name: string;

	private _bpm = 120;

	private _beat = 4;

	get name(): string {
		return this._name;
	}

	get notes(): Array<TrackNote> {
		return this._notes;
	}

	get bpm(): number {
		return this._bpm;
	}
	set bpm(value: number) {
		if (value <= 0) {
			value = 1;
		}
		if (value > Track.MAX_BPM) {
			value = Track.MAX_BPM;
		}

		this._bpm = value;
	}

	get beat(): number {
		return this._beat;
	}
	set beat(value: number) {
		if (value < Track.MIN_BEAT) {
			value = Track.MIN_BEAT;
		}
		if (value > Track.MAX_BEAT) {
			value = Track.MAX_BEAT;
		}

		this._beat = value;
	}

	constructor(name: string) {
		this._notes = [];
		this._name = name;
	}

	public addNoteAt(position: number): void {
		const note = TrackNote.createGhost(position);
		console.info('add note at ', position);
		console.info('note', note);

		console.info('notes before', this._notes);

		this._notes.forEach((existingNote: TrackNote) => {
			if (existingNote.position >= position) {
				console.info('existing note at position '+position)
				existingNote.position++;
			}
		})

		console.info('notes after', this._notes);

		console.info('Splicing:');
		this._notes.splice(position === 1 ? position - 1 : position, 0, note);
	}

	public addSlap() {
		this.addNote(null, TrackNoteType.slap);
	}

	public addGhostNote() {
		this.addNote(null, TrackNoteType.slap);
	}

	public addEmptyNote() {
		this.addNote(null, TrackNoteType.none);
	}

	public addNote(note: HandpanNote | null, type: TrackNoteType): void {
		const newNote = new TrackNote(note, type, this._notes.length);

		this._notes.forEach((existingNote: TrackNote) => {
			if (existingNote.position >= newNote.position) {
				existingNote.position++;
				existingNote.refresh();
			}
		})

		this._notes.push(newNote);
	}

	public addTuneNoteByPosition(tune: HandpanTune, position: number): void {
		const note = tune.getTopNoteByPosition(position);
		if (!note) {
			console.error(`Tried to find note at position ${position} of current Handpan tune, but did not found any. Skipping`);
			return;
		}
		this.addNote(note, TrackNoteType.note);
	}

	public addTuneNotesByPositions(tune: HandpanTune, positions: number[], repeat = 1): void {
		for (let i = 0; i < repeat; i++) {
			positions.forEach((position) => this.addTuneNoteByPosition(tune, position));
		}
	}

	public addTuneDingByPosition(tune: HandpanTune, position: number): void {
		this.addNote(tune.getDingByPosition(position), TrackNoteType.note);
	}

	public removeNote(note: TrackNote): void {
		this._notes = this._notes.filter((n: TrackNote) => n.id !== note.id);
	}

	public clone(): Track {
		const track = new Track(this.name);
		track.bpm = this.bpm;
		track.beat = this.beat;
		this._notes.forEach((note: TrackNote) => {
			track.addNote(note.note, note.type);
		});
		return track;
	}

	/**
	 * Refreshes the notes in the Tune that are present in the Track and vice-versa.
	 */
	public syncWithTune(tune: HandpanTune): void {
		this._notes.forEach((note: TrackNote) => {
			if (!note.isNote) {
				return;
			}

			if (!note.note) {
				console.error(`Track note ${note.baseName} is not linked to a HandpanNote. Skipping sync.`);
				return;
			}

			const similarNote = tune.getSameNote(note.note);

			if (!similarNote) {
				console.warn(
					`Note ${note.baseName} is in the current track but was not found in the handpan tune.`
				);
				return;
			}

			note.syncWithTuneNote(similarNote);
		});
	}
}
