import {
	AvailableOctaves,
	HandpanNoteType,
	Note,
	NoteAlteration,
	NoteMidiNumberBase
} from './_structs';

export default class HandpanNote {
	private _htmlElement: HTMLElement;
	private _note: Note;
	private _alteration: NoteAlteration;
	private _octave: number;
	private _isPlaying: boolean = false;
	private readonly _type: HandpanNoteType;
	private readonly _position: number;

	get htmlElement(): HTMLElement {
		return this._htmlElement;
	}

	set htmlElement(value: HTMLElement) {
		if (!value) {
			console.warn('Tried to set empty html element to handpan note.');
			return;
		}
		this._htmlElement = value;
	}

	get octave(): number {
		return this._octave;
	}

	set octave(value: number) {
		this._octave = value;
		this.refresh();
	}

	get alteration(): NoteAlteration {
		return this._alteration;
	}

	set alteration(value: NoteAlteration) {
		this._alteration = value;
		this.refresh();
	}

	get note(): Note {
		return this._note;
	}

	set note(value: Note) {
		this._note = value;
		this.refresh();
	}

	get type(): HandpanNoteType {
		return this._type;
	}

	get position(): number {
		return this._position;
	}

	get fullName(): string {
		return this._note + this._alteration + this._octave;
	}

	get isPlaying(): boolean {
		return this._isPlaying;
	}

	get fullDetailedName(): string {
		return (
			this._position +
			' - ' +
			this.fullName +
			(this.isDing ? ' (ding)' : '') +
			(this.isBottom ? ' (bottom)' : '')
		);
	}

	get isTop(): boolean {
		return this._type === HandpanNoteType.topNote;
	}

	get isDing(): boolean {
		return this._type === HandpanNoteType.ding;
	}

	get isBottom(): boolean {
		return this._type === HandpanNoteType.bottomNote;
	}

	get midiNumber(): number {
		let number = NoteMidiNumberBase[this._note.toString()] + (this._octave - 1) * 12;

		if (this._alteration === NoteAlteration.sharp) {
			number++;
		} else if (this._alteration === NoteAlteration.flat) {
			number--;
		}

		return number;
	}

	constructor(
		note: Note,
		alteration: NoteAlteration,
		octave: number,
		type: HandpanNoteType,
		position: number
	) {
		this._note = note;
		this._alteration = alteration;
		this._octave = octave;
		this._type = type;
		this._position = position;
		if (position < 0) {
			throw new Error('Note position must be a non-negative integer.');
		}
		this.refresh();
		this.refreshHtmlElement();
	}

	public setPlaying(): void {
		if (!this._htmlElement) {
			console.warn(
				`Playing note is not attached to any HTML element. The issue might be that this not is not in your current handpan tune.`
			);
			return;
		}

		this._isPlaying = true;

		this._htmlElement.classList.add('playing');
		this._htmlElement.firstElementChild.classList.add('playing');
	}

	public stopPlaying(): void {
		if (!this._htmlElement) {
			return;
		}

		this._isPlaying = false;

		this._htmlElement.classList.remove('playing');
		this._htmlElement.firstElementChild.classList.remove('playing');
	}

	/**
	 * This method makes sure enharmonic notes are renamed.
	 * For instance, "B#1" doesn't exist and should be converted to "C2".
	 *
	 * This will also make sure we have notes *without flat*,
	 * only sharp will be displayed, to standardize how music/mp3/flac/wav/etc. files
	 * will be stored in the project, even though a no-flat approach isn't complete standard…
	 */
	private refresh(): void {
		const notesConversionTable = {
			'B#': [Note.C, NoteAlteration.none, 1],
			'E#': [Note.F, NoteAlteration.none, 0],
			Ab: [Note.G, NoteAlteration.sharp, 0],
			Bb: [Note.A, NoteAlteration.sharp, 0],
			Cb: [Note.B, NoteAlteration.none, -1],
			Db: [Note.C, NoteAlteration.none, 0],
			Eb: [Note.D, NoteAlteration.sharp, 0],
			Fb: [Note.E, NoteAlteration.none, 0],
			Gb: [Note.F, NoteAlteration.sharp, 0]
		};

		const shortName = this._note + this._alteration;
		const convertedNote = notesConversionTable[shortName];

		if (!convertedNote) {
			return;
		}

		let updateOctaveBy: number;

		if (
			updateOctaveBy &&
			(this._octave + updateOctaveBy < Math.min(...AvailableOctaves) ||
				this._octave + updateOctaveBy < Math.max(...AvailableOctaves))
		) {
			return;
		}

		[this._note, this._alteration, updateOctaveBy] = convertedNote;
		if (updateOctaveBy) {
			this._octave += updateOctaveBy;
		}
	}

	public refreshHtmlElement(): void {
		if (typeof document === 'undefined') return; // SSR

		const noteElement = document.querySelector(`[data-handpan-note="${this.fullName}"]`);

		if (noteElement) {
			this.htmlElement = <HTMLElement>noteElement;
		}
	}
}
