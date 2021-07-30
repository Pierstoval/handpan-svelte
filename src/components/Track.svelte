<script lang="ts">
    import Track from "../classes/Track";
    import TrackNote from "./TrackNote.svelte";
    import HandpanTune from "../classes/HandpanTune";
    import Player from "../classes/Player";
    import RangeSlider from "svelte-range-slider-pips";

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

    let bpmRangeValue: number[] = [120];
    let beatRangeValue: number[] = [4];

    const springValues = { stiffness: .15, damping: .4 };

    $: track.bpm = bpmRangeValue[0];
    $: track.beat = beatRangeValue[0];
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
      margin: 5px auto;
      font-size: 25px;
      text-align: center;
      border: solid 2px #666;
      line-height: 20px;
      background: none transparent;
      cursor: pointer;
      &:active {
        transform: scale(0.95);
      }
    }
</style>

<h2>Track</h2>

<div>
    Beat:
    <RangeSlider id="range-beat" bind:values={beatRangeValue}  min={Track.MIN_BEAT} max={Track.MAX_BEAT} float pips all="label" {springValues} />
</div>

<div>
    Speed (bpm): <strong>{track.bpm}</strong>
    <RangeSlider id="range-bpm" bind:values={bpmRangeValue} min={Track.MIN_BPM} max={Track.MAX_BPM} step=5 float pips pipstep=2 all="label" {springValues} />
</div>

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