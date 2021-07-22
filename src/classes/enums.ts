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
