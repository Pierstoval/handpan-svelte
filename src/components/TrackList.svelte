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

	function changeTrackValue() {
		trackStore.set(currentTrack);
		currentTrack.syncWithTune(tune);
	}

	onMount(() => {
		trackList = trackStore.list(tune);
	});
</script>

<h2>Track list</h2>

<select name="tracks_list" id="tracks_list" bind:value={currentTrack} on:change={changeTrackValue}>
	{#each trackList as track_item}
		<option value={track_item}>
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
