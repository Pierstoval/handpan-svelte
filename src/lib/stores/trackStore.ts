import { writable } from 'svelte/store';
import Track from '$lib/classes/Track';
import type HandpanTune from '$lib/classes/HandpanTune';
import {
	AvailableOctaves,
	HandpanNoteType,
	Note,
	NoteAlteration,
	TrackNoteType,
	UnavailableNotes
} from '$lib/classes/_structs';
import HandpanNote from '$lib/classes/HandpanNote';
import { defaultTune } from '$lib/stores/tuneStore';

const internalTrackStore = writable<Track>(getDefault());

function list(tune: HandpanTune): Array<Track> {
	if (!tune) {
		return [];
	}

	return [allNotesTrack(), demoTrack(tune)];
}

function getDefault(): Track {
	return demoTrack(defaultTune());
}

function demoTrack(tune: HandpanTune): Track {
	const track = new Track('New York intro');
	track.bpm = 90;

	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 2, 4], 3);
	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 7, 8]);
	track.addTuneNotesByPositions(tune, [3, 5, 7, 3, 5, 7, 3, 5,], 2);
	track.addTuneNotesByPositions(tune, [1, 3, 5, 1, 3, 5, 1, 3,], 2);

	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 2, 4]);
	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 7, 8]);
	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 2, 4], 2);
	track.addTuneNotesByPositions(tune, [3, 5, 8, 3, 5, 8, 3, 5,], 2);
	track.addTuneNotesByPositions(tune, [1, 3, 5, 1, 3, 5, 1, 3,]);
	track.addTuneNotesByPositions(tune, [1, 3, 5, 1, 3, 8, 7, 6,]);

	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 2, 4]);
	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 7, 8]);
	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 2, 4], 2);
	track.addTuneNotesByPositions(tune, [2, 4, 6, 2, 4, 6, 2, 4]);

	track.addTuneNoteByPosition(tune, 1); track.addEmptyNote();
	track.addTuneNoteByPosition(tune, 2); track.addEmptyNote();
	track.addTuneNoteByPosition(tune, 3); track.addEmptyNote();
	track.addTuneNoteByPosition(tune, 4); track.addEmptyNote();
	track.addTuneNoteByPosition(tune, 5); track.addEmptyNote();
	track.addTuneNoteByPosition(tune, 6); track.addEmptyNote();
	track.addTuneNoteByPosition(tune, 7); track.addEmptyNote();
	track.addTuneNoteByPosition(tune, 8); track.addEmptyNote();
	track.addTuneDingByPosition(tune, 1);

	return track;
}

function allNotesTrack(): Track {
	let handpanNotePosition = 1;

	const notesToAdd: Array<[HandpanNote | null, TrackNoteType]> = [];

	const track = new Track('All notes');

	track.bpm = 180;

	AvailableOctaves.forEach((octave) => {
		const notes = [Note.C, Note.D, Note.E, Note.F, Note.G, Note.A, Note.B];
		notes.forEach((note: Note) => {
			const alterations = [NoteAlteration.flat, NoteAlteration.none, NoteAlteration.sharp];
			alterations.forEach((alteration: NoteAlteration) => {
				const handpanNote = new HandpanNote(
					note,
					alteration,
					octave,
					HandpanNoteType.topNote,
					handpanNotePosition++
				);

				if (UnavailableNotes.includes(handpanNote.fullName)) {
					return;
				}

				notesToAdd.push([handpanNote, TrackNoteType.note]);
			});
		});
	});

	notesToAdd.forEach(([note, type]) => {
		track.addNote(note, type);
	});

	return track;
}

export const trackStore = {
	...internalTrackStore,
	list
};
