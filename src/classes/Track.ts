import type TrackNote from "./TrackNote";

export default class Track {
    private readonly _notes: Array<TrackNote>;

    public bpm = 120;

    get notes(): Array<TrackNote> {
        return this._notes;
    }

    constructor() {
        this._notes = [];
    }

    addNote(note: TrackNote): void {
        this._notes.push(note);
    }
}
