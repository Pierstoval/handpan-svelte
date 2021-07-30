import {writable} from 'svelte/store';
import Track from "../classes/Track";
import TrackNote from "../classes/TrackNote";
import type HandpanTune from "../classes/HandpanTune";
import {
    AvailableOctaves,
    HandpanNoteType,
    Note,
    NoteAlteration,
    TrackNoteType,
    UnavailableNotes
} from "../classes/_structs";
import HandpanNote from "../classes/HandpanNote";

const baseValue = new Track();

function createTrack() {
    const { subscribe, set, update } = writable<Track>(baseValue);

    function setDefault(tune: HandpanTune) {
        set(allNotesTrack(tune, baseValue));
    }

    return {
        setDefault,
        subscribe,
    };
}

function demoTrack(tune: HandpanTune, track: Track): Track {
    track.addNote(new TrackNote(tune.getDingByPosition(0), TrackNoteType.note));
    track.addNote(new TrackNote(tune.getTopNoteByPosition(2), TrackNoteType.note));
    track.addNote(new TrackNote(null, TrackNoteType.slap));
    track.addNote(new TrackNote(tune.getTopNoteByPosition(4), TrackNoteType.note));

    track.addNote(new TrackNote(tune.getDingByPosition(0), TrackNoteType.note));
    track.addNote(new TrackNote(tune.getTopNoteByPosition(3), TrackNoteType.note));
    track.addNote(new TrackNote(null, TrackNoteType.slap));
    track.addNote(new TrackNote(tune.getTopNoteByPosition(5), TrackNoteType.note));

    return track;
}

function allNotesTrack(tune: HandpanTune, track: Track): Track {
    /**
     * Skipped because we don't have sounds for them (yet?).
     */
    let i = 0;

    const notesToAdd = {};

    AvailableOctaves.forEach((octave) => {
        const notes = [Note.C, Note.D, Note.E, Note.F, Note.G, Note.A, Note.B];
        notes.forEach((note: Note) => {
            const alterations = [NoteAlteration.flat, NoteAlteration.none, NoteAlteration.sharp];
            alterations.forEach((alteration: NoteAlteration) => {
                const handpanNote = new HandpanNote(note, alteration, octave, HandpanNoteType.topNote, i++);
                if (UnavailableNotes.includes(handpanNote.fullName)) {
                    return;
                }
                const trackNote = new TrackNote(handpanNote, TrackNoteType.note);
                notesToAdd[trackNote.fullName] = trackNote;
            });
        });
    });

    for (let key in notesToAdd) {
        const note = notesToAdd[key];
        track.addNote(note);
    }

    return track;
}

export const track = createTrack();
