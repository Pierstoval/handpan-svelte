<script lang="ts">
    import HandpanNote from "../classes/HandpanNote";
    import {Note, NoteAlteration} from "../classes/enums";

    export let note: HandpanNote = new HandpanNote(Note.C, NoteAlteration.sharp, 3, true, 0);

    const notes_types = Object.keys(Note);
</script>

<style lang="scss">
    .main_label {
        display: block;
    }
</style>

<label for="note" class="main_label">
    Note type
</label>
{#each notes_types as note_type }
    <label for="note_type_{note}" class="note_type">
        {note_type}
        <input type="radio" id="note_type_{note}" name="note_type[{note}]" value="{note_type}">
    </label>
{/each}
