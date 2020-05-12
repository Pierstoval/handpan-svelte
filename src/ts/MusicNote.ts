import {Note} from "./Note";
import {NoteAlteration} from "./NoteAlteration";

export default class MusicNote {
    private readonly _note: Note;
    private readonly _alteration: NoteAlteration;
    private readonly _octave: number;
    private readonly _ding: boolean;
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

    get ding(): boolean {
        return this._ding;
    }

    get position(): number {
        return this._position;
    }

    get fullName(): string {
        return this._note+this.alteration+this.octave
    }

    get isTop(): boolean {
        return this._position >= 0;
    }

    constructor(note: Note, alteration: NoteAlteration, octave: number, ding: boolean, position: number) {
        this._note = note;
        this._alteration = alteration;
        this._octave = octave;
        this._ding = ding;
        this._position = position;
    }
}
