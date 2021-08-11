<script lang="ts">
	import HandpanNote from './HandpanNote.svelte';
	import HandpanTune from '../classes/HandpanTune';
	import { tuneStore } from '../stores/tuneStore';

	let tune: HandpanTune;

	tuneStore.subscribe((value: HandpanTune) => (tune = value || tune));

	function onChange(note: HandpanNote): void {
		console.info('change note', note);
	}
</script>

<h2>Tune</h2>

<h3>Top notes:</h3>

<div class="notes-list">
	{#each tune.topNotes as note, i (note)}
		<HandpanNote {note} {onChange} />
	{/each}
</div>

<h3>Dings:</h3>
<div class="notes-list">
	{#each tune.dings as note, i (note)}
		<HandpanNote {note} {onChange} />
	{/each}
</div>

<h3>Bottom notes:</h3>
<div class="notes-list">
	{#each tune.bottomNotes as note, i (note)}
		<HandpanNote {note} {onChange} />
	{/each}
</div>
