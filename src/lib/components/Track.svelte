<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';

	import Track from '$lib/classes/Track';
	import Player from '$lib/classes/Player';

	import { trackStore } from '$lib/stores/trackStore';
	import { tuneStore } from '$lib/stores/tuneStore';

	import ActionButton from '$lib/components/ActionButton.svelte';
	import TrackNote from '$lib/components/TrackNote.svelte';
	import TrackNoteAdd from '$lib/components/TrackNoteAdd.svelte';
	import { get } from 'svelte/store';

	let bpmRangeValue: number = get(trackStore).bpm;
	let beatRangeValue: number = get(trackStore).beat;

	let isPlaying = false;

	function play() {
		isPlaying = true;
		Player.playTrack($trackStore, () => stop());
	}

	function stop() {
		isPlaying = false;
		Player.stop();
	}

	$: {
		$trackStore.bpm = bpmRangeValue;
		$trackStore.beat = beatRangeValue;
		$trackStore.syncWithTune($tuneStore);
	}

	const springValues = { stiffness: 0.15, damping: 0.8 };
</script>

<h2>Track</h2>

<section>
	<div>
		Beat:
		<RangeSlider
			bind:value={beatRangeValue}
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
			bind:value={bpmRangeValue}
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
		{#each $trackStore.notes as trackNote, position (trackNote.id)}
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
