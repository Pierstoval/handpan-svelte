import HandpanNote from './HandpanNote';
import {HandpanNoteType, Note, NoteAlteration} from "./_structs";

export default class HandpanTune {
	private readonly _topNotes: Array<HandpanNote> = [];
	private readonly _dings: Array<HandpanNote> = [];
	private readonly _bottomNotes: Array<HandpanNote> = [];

	constructor(notes: HandpanNote[]) {
		notes.forEach((note: HandpanNote) => this.addNote(note));

		this.refresh();
	}

	public static fromDeserializedJson(deserializedJson: any): HandpanTune {
		if (!deserializedJson) {
			throw 'Empty JSON cannot be used to create HandpanTune.';
		}
		if (
			!deserializedJson._topNotes
			|| !deserializedJson._dings
			|| !deserializedJson._bottomNotes
		) {
			throw 'Handpan Tune incoming JSON does not contain all necessary fields.';
		}

		// TODO: finish deserializing
		debugger;
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
		return this._topNotes.length
			+ this._dings.length
			+ this._bottomNotes.length;
	}

	get notes(): Array<HandpanNote> {
		return this._notes || [];
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

	public addNoteAt(position: number, type: HandpanNoteType): void {
		const note = new HandpanNote(
			Note.A,
			NoteAlteration.none,
			3,
			type,
			position,
		);

		let notes: Array<HandpanNote> = [];

		switch (type) {
			case HandpanNoteType.topNote: notes = this.topNotes; break;
			case HandpanNoteType.bottomNote: notes = this.bottomNotes; break;
			case HandpanNoteType.ding: notes = this.dings; break;
			default: throw new Error('Expected note to be either top, ding or bottom, and found an unsupported value.');
		}

		notes.splice(
			position === 1 ? (position-1) : position,
			0,
			note
		);
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
			case note.isTop: return this.getTopNoteByPosition(note.position);
			case note.isDing: return this.getDingByPosition(note.position);
			case note.isBottom: return this.getBottomNoteByPosition(note.position);
			default: throw new Error('Expected note to be either top, ding or bottom, and found an unsupported value.');
		}
	}

	private refresh(): void {
		const sortFunction = (n1: HandpanNote, n2: HandpanNote) => {
			const p1 = n1.position, p2 = n2.position;
			switch(true) {
				case p1 < p2: return -1;
				case p1 === p2: throw new Error('Two notes cannot have the same position!');
				case p1 > p2: return 1;
			}
		};

		this._topNotes.sort(sortFunction);
		this._dings.sort(sortFunction);
		this._bottomNotes.sort(sortFunction);
	}
}
