<script lang="ts">
	import Track from './Track.svelte';
	import { trackStore } from '../stores/trackStore';

	export let position: number;
	let track: Track;

	trackStore.subscribe((value: Track) => (track = value || track));

	function addNote() {
		track.addNoteAt(position);
		trackStore.set(track);
	}
</script>

<div class="track-note-container">
	<div class="track-note" on:click={addNote}>&plus;</div>
</div>

<style lang="scss">
	.track-note-container {
		position: relative;
		display: inline-block;
		margin: 0 10px;
		color: #222;

		&:before,
		&:after {
			content: ' ';
			position: absolute;
			z-index: 0;
			top: 25px;
			width: 20px;
			height: 0;
			font-size: 25px;
			border-bottom: solid 4px #ddd;
		}
		&:before {
			left: -10px;
		}
		&:after {
			right: -10px;
		}

		.track-note {
			font-family: Arial, sans-serif;
			position: relative;
			z-index: 1;
			margin: 0;
			padding: 0;
			text-align: center;
			border-radius: 50%;
			top: 13px;
			width: 25px;
			height: 25px;
			background: #223;
			border: 3px solid #ccd;
			line-height: 20px; // width or height minus border
			color: white;
			font-size: 1.2em;

			&:hover {
				z-index: 2;
				border-color: #fff;
				cursor: pointer;
			}
		}
	}
</style>
