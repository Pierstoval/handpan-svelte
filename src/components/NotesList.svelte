<script lang="ts">
    import {Note} from "../classes/enums";
    import HandpanNote from "./HandpanNote.svelte";

    export let notes: Note[];
</script>

<div class="notes-list">
    {#if notes && notes.length}
        {#each notes as note, i (note)}
            <HandpanNote {note} />
        {/each}
    {:else}
        None
    {/if}
</div>
