<script lang="ts">
	import HandpanTune from '../classes/HandpanTune';
	import { tuneStore } from '../stores/tuneStore';
	import { HandpanNoteType } from '../classes/_structs';

	export let position: number;
	export let type: HandpanNoteType;

	let tune: HandpanTune = $tuneStore;

	function addNote() {
		tune.addNoteAt(position, type);
		tuneStore.set(tune.clone());
	}
</script>

<div class="handpan-note-container">
	<button class="handpan-note" onclick={addNote}>&plus;</button>
</div>

<style lang="scss">
	.handpan-note-container {
		position: relative;
		display: inline-block;
		margin: 0;
		color: #222;

		&:before,
		&:after {
			content: ' ';
			position: absolute;
			z-index: 0;
			top: 0;
			width: 20px;
			height: 0;
			font-size: 25px;
		}
		&:before {
			left: -10px;
		}
		&:after {
			right: -10px;
		}

		.handpan-note {
			font-family: Arial, sans-serif;
			position: relative;
			z-index: 1;
			margin: 0;
			padding: 0;
			text-align: center;
			border-radius: 50%;
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
