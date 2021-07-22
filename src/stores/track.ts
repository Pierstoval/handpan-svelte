import {writable} from 'svelte/store';
import Track from "../classes/Track";
import TrackNote from "../classes/TrackNote";
import type HandpanTune from "../classes/HandpanTune";
import type HandpanNote from "../classes/HandpanNote";
import {TrackNoteType} from "../classes/enums";

const baseValue = new Track();

function createTrack() {
    const { subscribe, set, update } = writable<Track>(baseValue);

    function setDefault(tune: HandpanTune) {
        set(demoTrack(tune, baseValue));
    }

    return {
        setDefault,
        subscribe,
    };
}

function demoTrack(tune: HandpanTune, track: Track): Track {

    tune.notes.forEach((note: HandpanNote, i: number) => {

        if (i && i % 4 === 0) {
            track.addNote(new TrackNote(null, TrackNoteType.ghost));
        } else if (i && i % 2 === 0) {
            track.addNote(new TrackNote(null, TrackNoteType.slap));
        }

        if (i && i % 5 === 0) {
            track.addNote(new TrackNote(null, TrackNoteType.none));
        }

        track.addNote(new TrackNote(note, TrackNoteType.note));
    });

    track.addNote(new TrackNote(tune.getDingByPosition(0), TrackNoteType.note));

    return track;
}

export const track = createTrack();
