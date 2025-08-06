import { writable } from 'svelte/store';
import Track from '../classes/Track';
import TrackNote from '../classes/TrackNote';
import type HandpanTune from '../classes/HandpanTune';
import {
	AvailableOctaves,
	HandpanNoteType,
	Note,
	NoteAlteration,
	TrackNoteType,
	UnavailableNotes
} from '../classes/_structs';
import HandpanNote from '../classes/HandpanNote';

const { subscribe, set } = writable<Track>(getDefault());

function list(tune: HandpanTune): Array<Track> {
	if (!tune) {
		return [];
	}

	return [allNotesTrack(), demoTrack(tune)];
}

function getDefault(): Track {
	return allNotesTrack();
}

function demoTrack(tune: HandpanTune): Track {
	const track = new Track('Demo');

	track.addNote(new TrackNote(tune.getDingByPosition(1), TrackNoteType.note));
	track.addNote(new TrackNote(tune.getTopNoteByPosition(2), TrackNoteType.note));
	track.addNote(new TrackNote(null, TrackNoteType.slap));
	track.addNote(new TrackNote(tune.getTopNoteByPosition(4), TrackNoteType.note));

	track.addNote(new TrackNote(tune.getDingByPosition(1), TrackNoteType.note));
	track.addNote(new TrackNote(tune.getTopNoteByPosition(3), TrackNoteType.note));
	track.addNote(new TrackNote(null, TrackNoteType.slap));
	track.addNote(new TrackNote(tune.getTopNoteByPosition(5), TrackNoteType.note));

	return track;
}

function allNotesTrack(): Track {
	let handpanNotePosition = 1;

	const notesToAdd: { [key: string]: TrackNote } = {};

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

				const trackNote = new TrackNote(handpanNote, TrackNoteType.note);

				notesToAdd[trackNote.fullName] = trackNote;
			});
		});
	});

	for (const key in notesToAdd) {
		const note = notesToAdd[key];
		track.addNote(note);
	}

	return track;
}

export const trackStore = {
	list,
	subscribe,
	set
};
