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
		this._notes.splice(position === 1 ? position - 1 : position, 0, note);
	}

	public addNote(note: HandpanNote | null, type: TrackNoteType): void {
		this._notes.push(new TrackNote(note, type, this._notes.length));
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
