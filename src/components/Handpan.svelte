<script lang="ts">
    import NotesList from "./NotesList.svelte";
    import HandpanTune from "../classes/HandpanTune";

    export let tune: HandpanTune;
</script>

<style lang="scss">
    #handpan {
        width: 400px;
        margin: 10px auto 0 auto;
        display: block;
    }
</style>

<div>
    <h1>Tune</h1>
    <div id="handpan">
        <h2>Top notes:</h2>
        <NotesList notes={tune.topNotes} />

        <h2>Dings:</h2>
        <NotesList notes={tune.dings} />

        <h2>Bottom notes:</h2>
        <NotesList notes={tune.bottomNotes} />
    </div>
</div>
