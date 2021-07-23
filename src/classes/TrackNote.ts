import {TrackNoteType} from "./enums";
import type HandpanNote from "./HandpanNote";

export default class TrackNote {
    public note: HandpanNote|null;
    public type: TrackNoteType;
    public htmlElement: HTMLElement;
    private _initialColor: string;

    get fullName(): string {
        switch(true) {
            case this.isSlap:  return '×';
            case this.isGhost: return '👻';
            case this.isNone:  return '—';
            default:           return this.note?.fullName ?? '-';
        }
    }

    get playerName(): string {
        if (!this.isNote) {
            throw new Error(`Note name for the music player can only be retrieved on notes. Current note is "${this.type}".`);
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

    constructor(
        note: HandpanNote|null,
        type: TrackNoteType,
    ) {
        this.note = note;
        this.type = type;
    }

    public setPlaying(): void {
        if (!this._initialColor) {
            this._initialColor = this.htmlElement.style.borderColor;
        }
        this.htmlElement.firstElementChild.classList.add('playing');
    }

    public stopPlaying(): void {
        this.htmlElement.firstElementChild.classList.remove('playing');
    }
}
