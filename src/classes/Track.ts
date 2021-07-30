import type TrackNote from "./TrackNote";

export default class Track {
    public static readonly MIN_BPM = 50;
    public static readonly MAX_BPM = 200;

    public static readonly MIN_BEAT = 2;
    public static readonly MAX_BEAT = 8;

    private readonly _notes: Array<TrackNote>;

    private _bpm = 120;

    private _beat = 4;

    get bpm(): number {
        return this._bpm;
    }

    set bpm(value: number) {
        if (value <= 0) { value = 1; }
        if (value > Track.MAX_BPM) { value = Track.MAX_BPM; }

        this._bpm = value;
    }

    get beat(): number {
        return this._beat;
    }

    set beat(value: number) {
        if (value < Track.MIN_BEAT) { value = Track.MIN_BEAT; }
        if (value > Track.MAX_BEAT) { value = Track.MAX_BEAT; }

        this._beat = value;
    }

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
