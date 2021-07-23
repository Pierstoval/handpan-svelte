import { writable } from 'svelte/store';
import HandpanTune from "../classes/HandpanTune";
import HandpanNote from "../classes/HandpanNote";
import {HandpanNoteType, Note, NoteAlteration} from "../classes/enums";

const baseValue = new HandpanTune([
    new HandpanNote(Note.C, NoteAlteration.sharp, 3, HandpanNoteType.bottomNote, 0),
    new HandpanNote(Note.G, NoteAlteration.none, 3, HandpanNoteType.ding, 0),
    new HandpanNote(Note.A, NoteAlteration.none, 3, HandpanNoteType.topNote, 0),
    new HandpanNote(Note.B, NoteAlteration.none, 3, HandpanNoteType.topNote, 1),
    new HandpanNote(Note.C, NoteAlteration.sharp, 4, HandpanNoteType.topNote, 2),
    new HandpanNote(Note.D, NoteAlteration.sharp, 4, HandpanNoteType.topNote, 3),
    new HandpanNote(Note.E, NoteAlteration.none, 4, HandpanNoteType.topNote, 4),
    new HandpanNote(Note.F, NoteAlteration.sharp, 4, HandpanNoteType.topNote, 5),
    new HandpanNote(Note.G, NoteAlteration.sharp, 4, HandpanNoteType.topNote, 6),
]);

function createTune() {
    const { subscribe, set, update } = writable<HandpanTune>(baseValue);

    return {
        subscribe,
    };
}

export const tune = createTune();