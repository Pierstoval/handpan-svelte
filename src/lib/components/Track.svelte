<script lang="ts">
	import Track from '../classes/Track';
	import TrackNote from './TrackNote.svelte';
	import TrackNoteAdd from './TrackNoteAdd.svelte';
	import HandpanTune from '../classes/HandpanTune';
	import Player from '../classes/Player';
	import RangeSlider from 'svelte-range-slider-pips';
	import { trackStore } from '../stores/trackStore';
	import { tuneStore } from '../stores/tuneStore';
	import ActionButton from '$lib/components/ActionButton.svelte';

	let tune: HandpanTune;

	let track: Track;

	let bpmRangeValue: number[] = [120];
	let beatRangeValue: number[] = [4];

	let isPlaying = false;

	trackStore.subscribe((value: Track) => {
		track = value || track;
		bpmRangeValue = [track.bpm];
		beatRangeValue = [track.beat];
		syncTrackAndTune();
	});
	tuneStore.subscribe((value: HandpanTune) => {
		tune = value?.clone() || tune?.clone();
		syncTrackAndTune();
	});

	function syncTrackAndTune() {
		if (track && tune) {
			track.syncWithTune(tune);
		}
	}

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
			on:change={() => stop()}
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
			on:change={() => stop()}
		/>
	</div>

	{#if isPlaying}
		<ActionButton onclick={stop}>⏸</ActionButton>
	{:else}
		<ActionButton onclick={play}>⏯</ActionButton>
	{/if}

	<div class="notes">
		<TrackNoteAdd position={1} />
		{#each track.notes as trackNote, position (trackNote.id)}
			<TrackNote {trackNote} />
			<TrackNoteAdd position={position + 1} />
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
</style>
