<script lang="ts">
    import NotesList from "./NotesList.svelte";
    import HandpanTune from "../classes/HandpanTune";

    export let tune: HandpanTune;
</script>

<h2>Tune</h2>

<h3>Top notes:</h3>
<NotesList notes={tune.topNotes} />

<h3>Dings:</h3>
<NotesList notes={tune.dings} />

<h3>Bottom notes:</h3>
<NotesList notes={tune.bottomNotes} />
