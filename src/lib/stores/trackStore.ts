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
	const track = new Track('Demo');

	track.addNote(tune.getDingByPosition(1), TrackNoteType.note);
	track.addNote(tune.getTopNoteByPosition(2), TrackNoteType.note);
	track.addNote(null, TrackNoteType.slap);
	track.addNote(tune.getTopNoteByPosition(4), TrackNoteType.note);

	track.addNote(tune.getDingByPosition(1), TrackNoteType.note);
	track.addNote(tune.getTopNoteByPosition(3), TrackNoteType.note);
	track.addNote(null, TrackNoteType.slap);
	track.addNote(tune.getTopNoteByPosition(5), TrackNoteType.note);

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
