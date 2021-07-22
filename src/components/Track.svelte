<script lang="ts">
    import Track from "../classes/Track";
    import TrackNote from "./TrackNote.svelte";
    import HandpanTune from "../classes/HandpanTune";

    export let track: Track;
    export let tune: HandpanTune;
</script>

<style lang="scss">
    .notes {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: left;
      align-items: stretch;
      width: 280px;
    }
</style>

<h2>Track</h2>

<div class="notes">

    {#each track.notes as note}
        <TrackNote note={note} tune={tune} />
    {/each}

</div>