import type {Note} from "./enums";
import {HandpanNoteType, NoteAlteration, NoteMidiNumberBase} from "./enums";

export default class HandpanNote {
    public note: Note;
    public alteration: NoteAlteration;
    public octave: number;
    private readonly _type: HandpanNoteType;
    private readonly _position: number;

    get type(): HandpanNoteType {
        return this._type;
    }

    get position(): number {
        return this._position;
    }

    get fullName(): string {
        return this.note+this.alteration+this.octave
    }

    get fullDetailedName(): string {
        return this._position
            + ' - '
            + this.fullName
            + (this.isDing?' (ding)' : '')
            + (this.isBottom?' (bottom)' : '')
        ;
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
        let number = NoteMidiNumberBase[this.note.toString()] + ((this.octave-1) * 12);

        if (this.alteration === NoteAlteration.sharp) {
            number++;
        } else if (this.alteration === NoteAlteration.flat) {
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
        this.note = note;
        this.alteration = alteration;
        this.octave = octave;
        this._type = type;
        this._position = position;
        if (position < 0) {
            throw new Error('Note position must be a non-negative integer.');
        }
    }
}
