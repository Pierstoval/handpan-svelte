<script lang="ts">
    import Handpan from '../components/Handpan.svelte';
    import MusicNote from "../classes/MusicNote";
    import {Note} from "../classes/Note";
    import {NoteAlteration} from "../classes/NoteAlteration";

    export let notes: Array<MusicNote> = [
        new MusicNote(Note.C, NoteAlteration.sharp, 3, true, 0),
        new MusicNote(Note.G, NoteAlteration.none, 3, false, 0),
        new MusicNote(Note.A, NoteAlteration.none, 4, false, 1),
        new MusicNote(Note.B, NoteAlteration.none, 4, false, 2),
        new MusicNote(Note.C, NoteAlteration.sharp, 4, false, 3),
        new MusicNote(Note.D, NoteAlteration.sharp, 4, false, 4),
        new MusicNote(Note.E, NoteAlteration.none, 4, false, 5),
        new MusicNote(Note.F, NoteAlteration.sharp, 4, false, 6),
        new MusicNote(Note.G, NoteAlteration.sharp, 4, false, 7),
    ];
</script>

<section>

    <Handpan tune={notes}/>

</section>