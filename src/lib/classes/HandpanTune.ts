import HandpanNote from './HandpanNote';
import { HandpanNoteType, Note, NoteAlteration } from './_structs';

export default class HandpanTune {
	private _topNotes: Array<HandpanNote> = [];
	private _dings: Array<HandpanNote> = [];
	private _bottomNotes: Array<HandpanNote> = [];

	constructor(notes: HandpanNote[]) {
		notes.forEach((note: HandpanNote) => this.addNote(note));

		this.refresh();
	}

	public static fromDeserializedJson(deserializedJson: { [key: string]: unknown }): HandpanTune {
		if (!deserializedJson) {
			throw 'Empty JSON cannot be used to create HandpanTune.';
		}
		if (!deserializedJson._topNotes || !deserializedJson._dings || !deserializedJson._bottomNotes) {
			throw 'Handpan Tune incoming JSON does not contain all necessary fields.';
		}

		if (
			!Array.isArray(deserializedJson._topNotes) ||
			!Array.isArray(deserializedJson._dings) ||
			!Array.isArray(deserializedJson._bottomNotes)
		) {
			throw 'Handpan Tune incoming JSON does not contain arrays for top notes, dings and/or bottom notes.';
		}

		return new HandpanTune([
			...deserializedJson._topNotes,
			...deserializedJson._dings,
			...deserializedJson._bottomNotes
		]);
	}

	get dings(): Array<HandpanNote> {
		return this._dings;
	}

	get topNotes(): Array<HandpanNote> {
		return this._topNotes;
	}

	get bottomNotes(): Array<HandpanNote> {
		return this._bottomNotes;
	}

	get numberOfNotes(): number {
		return this._topNotes.length + this._dings.length + this._bottomNotes.length;
	}

	// TODO: change implementation.
	get notes(): Array<HandpanNote> {
		return [...this._topNotes, ...this._dings, ...this._bottomNotes];
	}

	public clone(): HandpanTune {
		return new HandpanTune([...this._topNotes, ...this._dings, ...this._bottomNotes]);
	}

	public addNote(note: HandpanNote): void {
		if (note.isTop) {
			this._topNotes.push(note);
			note.forcePosition(this._topNotes.length);
		} else if (note.isDing) {
			this._dings.push(note);
			note.forcePosition(this._dings.length);
		} else if (note.isBottom) {
			this._bottomNotes.push(note);
			note.forcePosition(this._topNotes.length);
		}
	}

	public addNoteFromDetails(
		noteType: Note,
		alteration: NoteAlteration,
		octave: number,
		type: HandpanNoteType
	): void {
		let position;
		if (type === HandpanNoteType.topNote) {
			position = this._topNotes.length ?? 0;
		} else if (type === HandpanNoteType.ding) {
			position = this._dings.length ?? 0;
		} else if (type === HandpanNoteType.bottomNote) {
			position = this._bottomNotes.length ?? 0;
		} else {
			throw new Error('Invalid note type provided for HandpanNote creation.');
		}

		const note = new HandpanNote(noteType, alteration, octave, type, position);

		this.addNote(note);
	}

	public removeNote(note: HandpanNote): void {
		if (note.isTop) {
			this._topNotes = this._topNotes.filter((n: HandpanNote) => n.id !== note.id);
			note.forcePosition(this._topNotes.length);
		} else if (note.isDing) {
			this._dings = this._dings.filter((n: HandpanNote) => n.id !== note.id);
			note.forcePosition(this._dings.length);
		} else if (note.isBottom) {
			this._bottomNotes = this._bottomNotes.filter((n: HandpanNote) => n.id !== note.id);
			note.forcePosition(this._topNotes.length);
		}
	}

	public addNoteAt(position: number, type: HandpanNoteType): void {
		const note = new HandpanNote(Note.A, NoteAlteration.none, 3, type, position);

		let notes: Array<HandpanNote>;

		switch (type) {
			case HandpanNoteType.topNote:
				notes = this.topNotes;
				break;
			case HandpanNoteType.bottomNote:
				notes = this.bottomNotes;
				break;
			case HandpanNoteType.ding:
				notes = this.dings;
				break;
			default:
				throw new Error(
					'Expected note to be either top, ding or bottom, and found an unsupported value.'
				);
		}

		notes.forEach((existingNote: HandpanNote) => {
			if (existingNote.position >= position) {
				existingNote.position++;
			}
		})

		notes.splice(position === 1 ? position - 1 : position, 0, note);
	}

	public getTopNoteByPosition(position: number): HandpanNote | null {
		for (const note of this._topNotes) {
			if (note.position === position) {
				return note;
			}
		}

		return null;
	}

	public getBottomNoteByPosition(position: number): HandpanNote | null {
		for (const note of this._bottomNotes) {
			if (note.position === position) {
				return note;
			}
		}

		return null;
	}

	public getDingByPosition(position: number): HandpanNote | null {
		for (const note of this._dings) {
			if (note.position === position) {
				return note;
			}
		}

		return null;
	}

	public getSameNote(note: HandpanNote): HandpanNote | null {
		switch (true) {
			case note.isTop:
				return this.getTopNoteByPosition(note.position);
			case note.isDing:
				return this.getDingByPosition(note.position);
			case note.isBottom:
				return this.getBottomNoteByPosition(note.position);
			default:
				throw new Error(
					'Expected note to be either top, ding or bottom, and found an unsupported value.'
				);
		}
	}

	private refresh(): void {
		const sortFunction = (a: HandpanNote, b: HandpanNote): number => {
			const p1 = a.position,
				p2 = b.position;
			switch (true) {
				case p1 < p2:
					return -1;
				case p1 === p2:
					throw new Error('Two notes cannot have the same position!');
				case p1 > p2:
					return 1;
			}

			throw new Error('Uncovered case, maybe note position is NaN?');
		};

		this._topNotes.sort(sortFunction);
		this._dings.sort(sortFunction);
		this._bottomNotes.sort(sortFunction);
	}
}
