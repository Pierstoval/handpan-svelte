import { TrackNoteType } from './_structs';
import type HandpanNote from './HandpanNote';

export default class TrackNote {
	private _id: string;
	public readonly type: TrackNoteType;
	public position: number;
	private _note: HandpanNote | null;
	private _htmlElement: HTMLElement | null = null;

	get id() {
		return this._id;
	}

	get note(): HandpanNote | null {
		return this._note;
	}

	set note(note: HandpanNote | null) {
		if (!note && this.type === TrackNoteType.note) {
			console.error('Tried to set empty note to TrackNote of type "note". Note is mandatory here.');
			return;
		}

		this._note = note;
		this.refresh();
	}

	get htmlElement(): HTMLElement {
		if (!this._htmlElement) {
			throw new Error(
				'Tried to access HTML element of track note, but it is not set.' +
					'You might want to call refreshHtmlElement() first.'
			);
		}

		return this._htmlElement;
	}

	set htmlElement(value: HTMLElement | null) {
		if (!value) {
			console.error('Tried to set empty html element to track note.');
			return;
		}

		this._htmlElement = value;
	}

	get baseName(): string {
		switch (true) {
			case this.isSlap:
				return '×';
			case this.isGhost:
				return '👻';
			case this.isNone:
				return '—';
			default:
				return this._note?.fullName ?? '-';
		}
	}

	get displayName(): string {
		if (!this.isNote) {
			throw new Error(
				`Note name for the music player can only be retrieved on notes. Current note is "${this.type}".`
			);
		}

		if (!this._note) {
			throw new Error(
				`Tried to get display name of track note, but it has no handpan note associated to it. Type: ${this.type}.`
			);
		}

		return this.position.toString() + '-' + this._note.fullName;
	}

	get isNote(): boolean {
		return this.type === TrackNoteType.note;
	}

	get isSlap(): boolean {
		return this.type === TrackNoteType.slap;
	}

	get isGhost(): boolean {
		return this.type === TrackNoteType.ghost;
	}

	get isNone(): boolean {
		return this.type === TrackNoteType.none;
	}

	constructor(note: HandpanNote | null, type: TrackNoteType, position: number) {
		if (!note && TrackNote.typeNeedsHandpanNote(type)) {
			throw `Tried to create track note of type "${type}" with no HandpanNote, but this type needs one.`;
		}
		this._note = note;
		this.type = type;
		this.position = position;
		this._id = this.position + '-' + this.baseName;
		this.refresh();
		this.refreshHtmlElement();
	}

	public static createGhost(position: number): TrackNote {
		return new TrackNote(null, TrackNoteType.ghost, position);
	}

	public setPlaying(): void {
		this.htmlElement.firstElementChild?.classList.add('playing');

		if (this._note) {
			this._note.setPlaying();
		}
	}

	public stopPlaying(): void {
		this.htmlElement.firstElementChild?.classList.remove('playing');

		if (this._note) {
			this._note.stopPlaying();
		}
	}

	public syncWithTuneNote(note: HandpanNote): void {
		this.refreshHtmlElement();
		this._note = note;
		note.refreshHtmlElement();
	}

	public refreshHtmlElement(): void {
		if (typeof document === 'undefined') return; // SSR

		const noteElement = document.querySelector(`[data-track-note="${this.id}"]`);

		if (noteElement) {
			this.htmlElement = <HTMLElement>noteElement;
		}
	}

	public refresh() {
		this._id = this.position + '-' + this.baseName;
	}

	private static typeNeedsHandpanNote(type: TrackNoteType): boolean {
		return type === TrackNoteType.note;
	}
}
