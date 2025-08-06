import { writable } from 'svelte/store';
import HandpanTune from '../classes/HandpanTune';
import HandpanNote from '../classes/HandpanNote';
import { HandpanNoteType, Note, NoteAlteration } from '../classes/_structs';

const TUNE_STORE_KEY = '7bbc19fe-0778-4069-9cdc-6dc4a9318e2b';

const storage: Storage | null = typeof window !== 'undefined' ? window?.localStorage : null;

const { subscribe, set } = writable<HandpanTune>(getCurrent());

function save(tune: HandpanTune) {
	set(tune);

	if (storage) {
		storage.setItem(TUNE_STORE_KEY, JSON.stringify(tune));
	}
}

function getCurrent(): HandpanTune {
	if (storage) {
		const serializedTune = storage.getItem(TUNE_STORE_KEY);

		if (serializedTune) {
			console.info('TODO: Deserialize properly the HandpanTune object');

			return HandpanTune.fromDeserializedJson(JSON.parse(serializedTune));
		}
	}

	return defaultTune();
}

function defaultTune(): HandpanTune {
	return new HandpanTune([
		new HandpanNote(Note.C, NoteAlteration.sharp, 3, HandpanNoteType.bottomNote, 1),
		new HandpanNote(Note.G, NoteAlteration.none, 3, HandpanNoteType.ding, 1),
		new HandpanNote(Note.A, NoteAlteration.none, 3, HandpanNoteType.topNote, 1),
		new HandpanNote(Note.B, NoteAlteration.none, 3, HandpanNoteType.topNote, 2),
		new HandpanNote(Note.C, NoteAlteration.sharp, 4, HandpanNoteType.topNote, 3),
		new HandpanNote(Note.D, NoteAlteration.sharp, 4, HandpanNoteType.topNote, 4),
		new HandpanNote(Note.E, NoteAlteration.none, 4, HandpanNoteType.topNote, 5),
		new HandpanNote(Note.F, NoteAlteration.sharp, 4, HandpanNoteType.topNote, 6),
		new HandpanNote(Note.G, NoteAlteration.sharp, 4, HandpanNoteType.topNote, 7)
	]);
}

export const tuneStore = {
	subscribe,
	set: save
};
