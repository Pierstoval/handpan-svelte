<script lang="ts">
    import MusicNote from "../classes/MusicNote";
    import NotesList from "./NotesList.svelte";

    export let tune: Array<MusicNote>;

    let dings = tune.filter((note) => note.ding);
    let topNotes = tune.filter((note) => !note.ding && note.isTop);
    let bottomNotes = tune.filter((note) => !note.ding && !note.isTop);
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
        <NotesList notes={topNotes} />

        <h2>Dings:</h2>
        <NotesList notes={dings} />

        <h2>Bottom notes:</h2>
        <NotesList notes={bottomNotes} />
    </div>
</div>
