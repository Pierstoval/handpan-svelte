import type Track from "./Track";
import type TrackNote from "./TrackNote";

const soundFiles = {
    'clac': 'clac/clac.flac',
    'gu': 'gu/D2.flac',
    'notes': {
        'E2': 'shellopan/E2.flac',
        'F2': 'shellopan/F2.flac',
        'F#2': 'shellopan/Fs2.flac',
        'G2': 'shellopan/G2.flac',
        'G#2': 'shellopan/Gs2.flac',
        'A2': 'shellopan/A2.flac',
        'A#2': 'shellopan/As2.flac',
        'B2': 'shellopan/B2.flac',
        'C3': 'shellopan/C3.flac',
        'C#3': 'shellopan/Cs3.flac',
        'D3': 'shellopan/D3.flac',
        'D#3': 'shellopan/Ds3.flac',
        'E3': 'shellopan/E3.flac',
        'F3': 'shellopan/F3.flac',
        'F#3': 'shellopan/Fs3.flac',
        'G3': 'shellopan/G3.flac',
        'G#3': 'shellopan/Gs3.flac',
        'A3': 'shellopan/A3.flac',
        'A#3': 'shellopan/As3.flac',
        'B3': 'shellopan/B3.flac',
        'C4': 'shellopan/C4.flac',
        'C#4': 'shellopan/Cs4.flac',
        'D4': 'shellopan/D4.flac',
        'D#4': 'shellopan/Ds4.flac',
        'E4': 'shellopan/E4.flac',
        'F4': 'shellopan/F4.flac',
        'F#4': 'shellopan/Fs4.flac',
        'G4': 'shellopan/G4.flac',
        'G#4': 'shellopan/Gs4.flac',
        'A4': 'shellopan/A4.flac',
        'A#4': 'shellopan/As4.flac',
        'B4': 'shellopan/B4.flac',
        'C5': 'shellopan/C5.flac',
        'C#5': 'shellopan/Cs5.flac',
        'D5': 'shellopan/D5.flac',
        'D#5': 'shellopan/Ds5.flac',
        'E5': 'shellopan/E5.flac',
        'F5': 'shellopan/F5.flac',
        'F#5': 'shellopan/Fs5.flac',
        'G5': 'shellopan/G5.flac',
        'G#5': 'shellopan/Gs5.flac',
        'A5': 'shellopan/A5.flac',
    }
};

export default class Player {
    private static loadedAudio = {};

    private static isPlayingTrack = false;
    private static playingTimeouts: Array<Timeout> = [];

    public static loadSounds(): void {
        this.load('clac', soundFiles.clac);
        this.load('gu', soundFiles.gu);
        for (const note in soundFiles.notes) {
            this.load(note, soundFiles.notes[note]);
        }
    }

    public static playTrack(track: Track, finishCallback: () => unknown): void {
        this.clearTimeouts();

        if (track.bpm === 0) {
            throw new Error('The BPM (beats per minute) must be different than zero.');
        }

        if (track.bpm < 0) {
            throw new Error('The BPM (beats per minute) must be a positive number.');
        }

        const millisecondsPerBeat = (1000 * 60 / track.bpm) / 4;

        this.isPlayingTrack = true;
        const clonedNotes  = Object.assign([], track.notes);
        this.playSequence([...clonedNotes], millisecondsPerBeat);

        if (finishCallback) {
            this.playingTimeouts.push(setTimeout(finishCallback, (millisecondsPerBeat * (clonedNotes.length + 1))));
        }
    }

    public static stop(): void {
        this.clearTimeouts();
    }

    private static playNoteByType(type: string, volume = 1): void {
        if (!this.loadedAudio[type]) {
            throw new Error(`Sound type "${type}" is not loaded or does not exist.`);
        }
        this.loadedAudio[type].volume = volume;
        this.loadedAudio[type].play();
        this.loadedAudio[type].volume = 1;
    }

    /**
     * This function is called recursively when playing a sequence of notes.
     */
    private static playSequence(notes: Array<TrackNote>, millisecondsPerBeat: number): void {
        if (this.isPlayingTrack === false) {
            // Player stopped.
            return;
        }
        const note = notes.shift();
        this.playNote(note);
        if (notes.length > 0) {
            const timeout = setTimeout(() => {
                Player.playSequence(notes, millisecondsPerBeat);
            }, millisecondsPerBeat);

            this.playingTimeouts.push(timeout);
        }
    }

    private static playNote(note: TrackNote): void {
        switch(true) {
            case note.isSlap:
                this.playNoteByType('clac');
                break;

            case note.isGhost:
                this.playNoteByType('clac', 0.5);
                break;

            case note.isNone:
                break;

            default:
                this.playNoteByType(note.playerName);
                break;
        }
    }

    private static clearTimeouts(): void {
        while (this.playingTimeouts.length) {
            const timeout = this.playingTimeouts.shift();
            clearTimeout(timeout);
        }
        this.isPlayingTrack = false;
    }

    private static load(type: string, soundFile: string): void {
        const audio = new Audio();
        audio.src = soundFile;
        audio.preload = 'auto';
        audio.volume = 1;
        audio.addEventListener('canplaythrough', () => this.loadedAudio[type] = audio);
    }
}
