import type HandpanNote from './HandpanNote';

export default class HandpanTune {
	private readonly _notes: Array<HandpanNote>;

	constructor(notes: HandpanNote[]) {
		this._notes = notes;
	}

	get dings(): Array<HandpanNote> {
		return this._notes.filter((note) => note.isDing);
	}

	get topNotes(): Array<HandpanNote> {
		return this._notes.filter((note) => note.isTop);
	}

	get bottomNotes(): Array<HandpanNote> {
		return this._notes.filter((note) => note.isBottom);
	}

	get notes(): Array<HandpanNote> {
		return this._notes || [];
	}

	public getTopNoteByPosition(position: number): HandpanNote | null {
		for (const note of this._notes) {
			if (note.isTop && note.position === position) {
				return note;
			}
		}

		return null;
	}

	public getBottomNoteByPosition(position: number): HandpanNote | null {
		for (const note of this._notes) {
			if (note.isBottom && note.position === position) {
				return note;
			}
		}

		return null;
	}

	public getDingByPosition(position: number): HandpanNote | null {
		for (const note of this._notes) {
			if (note.isDing && note.position === position) {
				return note;
			}
		}

		return null;
	}

	public getSameNote(note: HandpanNote): HandpanNote | null {
		if (!note) {
			return null;
		}

		const filtered: Array<HandpanNote> = this._notes.filter((tuneNote: HandpanNote) => {
			return tuneNote.fullName === note.fullName;
		});

		if (filtered.length === 0) {
			return null;
		}

		return filtered[0];
	}
}
