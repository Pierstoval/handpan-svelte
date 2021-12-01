<script lang="ts">
	import Track from '../classes/Track';
	import HandpanTune from '../classes/HandpanTune';
	import { trackStore } from '../stores/trackStore';
	import { tuneStore } from '../stores/tuneStore';
	import { onMount } from 'svelte';

	let tune: HandpanTune;

	let currentTrack: Track;
	let trackList: Array<Track> = [];

	tuneStore.subscribe((value: HandpanTune) => {
		tune = value || tune;
	});
	trackStore.subscribe((value: Track) => (currentTrack = value || currentTrack));

	function changeTrackValue(changeEvent: Event) {
		const index: number = parseInt(changeEvent.target?.value, 10);
		if (!trackList[index]) {
			throw 'Invalid track index selected.';
		}

		currentTrack = trackList[index];

		trackStore.set(currentTrack);
		currentTrack.syncWithTune(tune);
	}

	onMount(() => {
		trackList = trackStore.list(tune);
	});
</script>

<h2>Track list</h2>

<select name="tracks_list" id="tracks_list" on:change={changeTrackValue}>
	{#each trackList as track_item, index}
		<option value={index}>
			{track_item.name}
		</option>
	{/each}
</select>

<style lang="scss">
	select {
		max-width: 100%;
		min-width: 50%;
	}
</style>
