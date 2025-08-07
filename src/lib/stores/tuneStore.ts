import { writable } from 'svelte/store';
import HandpanTune from '../classes/HandpanTune';
import { HandpanNoteType, Note, NoteAlteration } from '../classes/_structs';

// const TUNE_STORE_KEY = '7bbc19fe-0778-4069-9cdc-6dc4a9318e2b';

const internalTuneStore = writable<HandpanTune>(defaultTune());

function init() {
	const storage = getStorage();

	if (!storage) {
		// It's normal in SSR, so we can just return.
		return;
	}

	const tune = getFromStorage();

	if (tune) {
		internalTuneStore.set(tune.clone());
		return;
	}

	console.error('No Handpan Tune in storage. Fallback to default tune.');

	internalTuneStore.set(defaultTune());
}

function getStorage(): Storage | null {
	return typeof window !== 'undefined' ? window?.localStorage : null;
}

function save(tune: HandpanTune) {
	internalTuneStore.set(tune.clone());

	// const storage = getStorage();
	//
	// if (storage) {
	// 	storage.setItem(TUNE_STORE_KEY, JSON.stringify(tune));
	// }
}

function getFromStorage(): HandpanTune | null {
	return null;

	// const storage = getStorage();
	//
	// if (!storage) {
	// 	return null;
	// }
	//
	// const serializedTune = storage.getItem(TUNE_STORE_KEY);
	//
	// if (serializedTune) {
	// 	const parsed = JSON.parse(serializedTune);
	//
	// 	if (!parsed || !parsed._topNotes || !parsed._dings || !parsed._bottomNotes) {
	// 		console.error('Handpan Tune JSON does not contain all necessary fields. Using default tune.');
	//
	// 		return null;
	// 	}
	//
	// 	console.info('TODO: Deserialize properly the HandpanTune object', parsed);
	//
	// 	return HandpanTune.fromDeserializedJson(parsed);
	// }
	//
	// return null;
}

export function defaultTune(): HandpanTune {
	const tune = new HandpanTune([]);

	tune.addNoteFromDetails(Note.C, NoteAlteration.sharp, 3, HandpanNoteType.bottomNote);

	tune.addNoteFromDetails(Note.G, NoteAlteration.none, 3, HandpanNoteType.ding);

	tune.addNoteFromDetails(Note.A, NoteAlteration.none, 3, HandpanNoteType.topNote);
	tune.addNoteFromDetails(Note.B, NoteAlteration.none, 3, HandpanNoteType.topNote);
	tune.addNoteFromDetails(Note.C, NoteAlteration.sharp, 4, HandpanNoteType.topNote);
	tune.addNoteFromDetails(Note.D, NoteAlteration.sharp, 4, HandpanNoteType.topNote);
	tune.addNoteFromDetails(Note.E, NoteAlteration.none, 4, HandpanNoteType.topNote);
	tune.addNoteFromDetails(Note.F, NoteAlteration.sharp, 4, HandpanNoteType.topNote);
	tune.addNoteFromDetails(Note.G, NoteAlteration.sharp, 4, HandpanNoteType.topNote);

	return tune;
}

export const tuneStore = {
	...internalTuneStore,
	set: save,
	init
};
