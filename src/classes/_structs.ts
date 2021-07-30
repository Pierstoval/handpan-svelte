export enum Hand {
    left = 'left',
    right = 'right',
}

export enum Note {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
    G = 'G',
}

export const UnavailableNotes = [
    'Cb2',
    'C2',
    'C#2',
    'Db2',
    'D2',
    'D#2',
    'Eb2',
    'A#5',
    'B1',
    'Bb5',
    'B5',
    'B#5',
    'C6',
];

export const AvailableOctaves = [
    2,
    3,
    4,
    5,
];

/**
 * Everything can be calculated based
 * on the fact that C1 = 24.
 * A0 and B0 can be calculated too, but
 * they're incompatible with handpans, so…
 */
export const NoteMidiNumberBase = {
    'C': 24,
    'D': 26,
    'E': 28,
    'F': 29,
    'G': 31,
    'A': 33,
    'B': 35,
}

export enum NoteAlteration {
    none = '',
    sharp = '#',
    flat = 'b',
}

export enum HandpanNoteType {
    topNote = 'topNote',
    bottomNote = 'bottomNote',
    ding = 'ding',
}

export enum TrackNoteType {
    note = 'note',
    slap = 'slap',
    ghost = 'ghost',
    none = 'none',
}
