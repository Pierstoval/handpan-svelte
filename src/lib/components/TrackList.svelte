<script lang="ts">
	import Track from '../classes/Track';
	import HandpanTune from '../classes/HandpanTune';
	import { trackStore } from '../stores/trackStore';
	import { tuneStore } from '../stores/tuneStore';
	import { onMount } from 'svelte';

	let tune: HandpanTune;
	let storage: Storage;

	let currentTrack: Track;
	let trackList: Array<Track> = [];

	tuneStore.subscribe((value: HandpanTune) => {
		tune = value || tune;
	});
	trackStore.subscribe((value: Track) => (currentTrack = value || currentTrack));

	function onTrackValueChange(changeEvent: Event) {
		const target = changeEvent.target as HTMLSelectElement;
		changeCurrentTrack(parseInt(String(target.value ?? ''), 10));
	}

	function changeCurrentTrack(index: number) {
		if (!trackList[index]) {
			throw 'Invalid track index selected.';
		}

		currentTrack = trackList[index];
		storage.setItem('current_track', index.toString());
		try {
			trackStore.set(currentTrack);
			currentTrack.syncWithTune(tune);
		} catch (error) {
			console.error('Error setting current track:', error);

			return;
		}
	}

	onMount(() => {
		trackList = trackStore.list(tune);
		storage = window.localStorage;
		const currentTrackIndex = parseInt(String(storage.getItem('current_track')), 10);
		if (!isNaN(currentTrackIndex)) {
			changeCurrentTrack(currentTrackIndex);
		}
	});
</script>

<h2>Track list</h2>

<select name="tracks_list" id="tracks_list" on:change={onTrackValueChange}>
	{#each trackList as track_item, index (track_item.name)}
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
