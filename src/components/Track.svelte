<script lang="ts">
    import Track from "../classes/Track";
    import TrackNote from "./TrackNote.svelte";
    import HandpanTune from "../classes/HandpanTune";
    import Player from "../classes/Player";

    export let track: Track;
    export let tune: HandpanTune;

    let playing = false;

    function play() {
        playing = true;
        Player.playTrack(track, () => playing = false);
    }

    function stop() {
        Player.stop();
        playing = false;
    }
</script>

<style lang="scss">
    .notes {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: left;
      align-items: stretch;
      width: 560px;
    }

    .track-control {
      width: 40px;
      height: 40px;
      font-size: 32px;
      text-align: center;
      border: none transparent;
      background: none transparent;
      cursor: pointer;
      &:active {
        transform: scale(0.95);
      }
    }
</style>

<h2>Track</h2>

{#if playing}
    <button type="button" class="track-control" on:click={stop}>
        ⏸
    </button>
{:else}
    <button type="button" class="track-control" on:click={play}>
        ⏯
    </button>
{/if}

<div class="notes">

    {#each track.notes as note}
        <TrackNote note={note} tune={tune} />
    {/each}

</div>