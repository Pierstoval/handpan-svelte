import { TrackNoteType } from './_structs';
import type HandpanNote from './HandpanNote';

export default class TrackNote {
	public note: HandpanNote | null;
	public type: TrackNoteType;
	private _htmlElement: HTMLElement;

	get htmlElement(): HTMLElement {
		return this._htmlElement;
	}

	set htmlElement(value: HTMLElement | null) {
		if (!value) {
			console.error('Tried to set empty html element to track note.');
			return;
		}
		this._htmlElement = value;
	}

	get fullName(): string {
		switch (true) {
			case this.isSlap:
				return '×';
			case this.isGhost:
				return '👻';
			case this.isNone:
				return '—';
			default:
				return this.note?.fullName ?? '-';
		}
	}

	get displayName(): string {
		if (!this.isNote) {
			throw new Error(
				`Note name for the music player can only be retrieved on notes. Current note is "${this.type}".`
			);
		}

		return this.note.fullName;
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

	constructor(note: HandpanNote | null, type: TrackNoteType) {
		this.note = note;
		this.type = type;
		this.refreshHtmlElement();
	}

	public setPlaying(): void {
		if (!this._htmlElement) {
			console.error(
				`Cannot highlight note ${this.fullName} because it does not have an HTML Element associated to it.`
			);
			return;
		}

		this._htmlElement.firstElementChild.classList.add('playing');

		if (this.note) {
			this.note.setPlaying();
		}
	}

	public stopPlaying(): void {
		if (!this._htmlElement) {
			console.error(
				`Cannot disable highlight for note ${this.fullName} because it does not have an HTML Element associated to it.`
			);
			return;
		}

		this._htmlElement.firstElementChild.classList.remove('playing');

		if (this.note) {
			this.note.stopPlaying();
		}
	}

	public syncWithTuneNote(note: HandpanNote): void {
		if (!note) return;

		this.note = note;
		this.refreshHtmlElement();
		note.refreshHtmlElement();
	}

	public refreshHtmlElement(): void {
		if (typeof document === 'undefined') return; // SSR

		const noteElement = document.querySelector(`[track="${this.fullName}"]`);

		if (noteElement) {
			this.htmlElement = <HTMLElement>noteElement;
		}
	}
}
