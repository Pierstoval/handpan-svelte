import {writable} from 'svelte/store';
import Track from "../classes/Track";
import TrackNote from "../classes/TrackNote";
import type HandpanTune from "../classes/HandpanTune";
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

export const track = createTrack();
