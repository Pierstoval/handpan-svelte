import type {Note, NoteAlteration} from "./enums";
import {HandpanNoteType} from "./enums";

export default class HandpanNote {
    private readonly _note: Note;
    private readonly _alteration: NoteAlteration;
    private readonly _octave: number;
    private readonly _type: HandpanNoteType;
    private readonly _position: number;

    get note(): Note {
        return this._note;
    }

    get alteration(): NoteAlteration {
        return this._alteration;
    }

    get octave(): number {
        return this._octave;
    }

    get type(): HandpanNoteType {
        return this._type;
    }

    get position(): number {
        return this._position;
    }

    get fullName(): string {
        return this._note+this.alteration+this.octave
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
    }
}
