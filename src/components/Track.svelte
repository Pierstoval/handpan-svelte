<script lang="ts">
	import Track from '../classes/Track';
	import TrackNote from './TrackNote.svelte';
	import TrackNoteAdd from './TrackNoteAdd.svelte';
	import HandpanTune from '../classes/HandpanTune';
	import Player from '../classes/Player';
	import RangeSlider from 'svelte-range-slider-pips';
	import { trackStore } from '../stores/trackStore';
	import { tuneStore } from '../stores/tuneStore';

	let tune: HandpanTune;

	let track: Track;

	let bpmRangeValue: number[] = [120];
	let beatRangeValue: number[] = [4];

	let isPlaying = false;

	trackStore.subscribe((value: Track) => {
		track = value || track;
		bpmRangeValue = [track.bpm];
		beatRangeValue = [track.beat];
		if (tune) {
			track.syncWithTune(tune);
		}
	});
	tuneStore.subscribe((value: HandpanTune) => tune = value || tune);

	function play() {
		isPlaying = true;
		Player.playTrack(track, () => stop());
	}

	function stop() {
		isPlaying = false;
		Player.stop();
	}

	$: {
		track.bpm = bpmRangeValue[0];
		track.beat = beatRangeValue[0];
	}

	const springValues = { stiffness: 0.15, damping: 0.8 };
</script>

<h2>Track</h2>

<section>
	<div>
		Beat:
		<RangeSlider
			bind:values={beatRangeValue}
			min={Track.MIN_BEAT}
			max={Track.MAX_BEAT}
			float
			pips
			all="label"
			{springValues}
		/>
	</div>

	<div>
		Speed (bpm):
		<RangeSlider
			bind:values={bpmRangeValue}
			min={Track.MIN_BPM}
			max={Track.MAX_BPM}
			step={5}
			float
			pips
			pipstep={2}
			all="label"
			{springValues}
		/>
	</div>

	{#if isPlaying}
		<button type="button" class="track-control" on:click={stop}> ⏸ </button>
	{:else}
		<button type="button" class="track-control" on:click={play}> ⏯ </button>
	{/if}

	<div class="notes">
		<TrackNoteAdd bind:tune={tune} />
		{#each track.notes as trackNote, position}
			<TrackNote bind:trackNote={trackNote} bind:tune={tune} />
			<TrackNoteAdd position={position} />
		{/each}
	</div>
</section>

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
		color: white;
		line-height: 20px;
		background: none transparent;
		cursor: pointer;
	}
	.track-control:active {
		transform: scale(0.95);
	}
</style>
