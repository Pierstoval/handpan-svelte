<script lang="ts">
    import Track from "../classes/Track";
    import TrackNote from "./TrackNote.svelte";
    import HandpanTune from "../classes/HandpanTune";
    import Player from "../classes/Player";
    import RangeSlider from "svelte-range-slider-pips";

    export let track: Track;
    export let tune: HandpanTune;

    let isPlaying = false;

    function play() {
        isPlaying = true;
        Player.playTrack(track, () => stop());
    }

    function stop() {
        isPlaying = false;
        Player.stop();
    }

    let bpmRangeValue: number[] = [120];
    let beatRangeValue: number[] = [4];

    $: track.bpm = bpmRangeValue[0];
    $: track.beat = beatRangeValue[0];
</script>

<style lang="scss">
    section {
      width: 560px;
    }

    .notes {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: left;
      align-items: stretch;
    }

    .track-control {
      width: 40px;
      height: 40px;
      margin: 5px auto;
      font-size: 25px;
      text-align: center;
      border: solid 2px #666;
      line-height: 20px;
      background: none transparent;
      cursor: pointer;
    }
    .track-control:active {
      transform: scale(0.95);
    }
</style>

<h2>Track</h2>

<section>
    <div>
        Beat:
        <RangeSlider bind:values={beatRangeValue} min={Track.MIN_BEAT} max={Track.MAX_BEAT} float pips all="label" />
    </div>

    <div>
        Speed (bpm):
        <RangeSlider bind:values={bpmRangeValue} min={Track.MIN_BPM} max={Track.MAX_BPM} float pips pipstep=10 all="label" />
    </div>

    {#if isPlaying}
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
</section>