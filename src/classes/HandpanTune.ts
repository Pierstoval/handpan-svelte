import type HandpanNote from "./HandpanNote";

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
        return this._notes;
    }

    public getNoteByPosition(position: number): HandpanNote | null {
        for (let note of this._notes) {
            if (note.position === position) {
                return note;
            }
        }

        return null;
    }

    public numberOfDings(): number {
        let numberOfDings = 0;

        for (const note of this._notes) {
            if (note.position <= 0) {
                numberOfDings++;
            }
        }

        return numberOfDings;
    }

    public numberOfNotes(): number {
        return this.notes.length - this.numberOfDings();
    }
}
