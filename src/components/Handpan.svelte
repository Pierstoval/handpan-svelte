<script lang="ts">
    import HandpanNote from "./HandpanNote.svelte";
    import HandpanTune from "../classes/HandpanTune";

    export let tune: HandpanTune;
</script>

<h2>Tune</h2>

<h3>Top notes:</h3>

<div class="notes-list">
    {#each tune.topNotes as note, i (note)}
        <HandpanNote {note} />
    {/each}
</div>

<h3>Dings:</h3>
<div class="notes-list">
    {#each tune.dings as note, i (note)}
        <HandpanNote {note} />
    {/each}
</div>

<h3>Bottom notes:</h3>
<div class="notes-list">
    {#each tune.bottomNotes as note, i (note)}
        <HandpanNote {note} />
    {/each}
</div>
