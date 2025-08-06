<script lang="ts">
	import HandpanNote from './HandpanNote.svelte';
	import HandpanTune from '../classes/HandpanTune';
	import { tuneStore } from '../stores/tuneStore';
	import HandpanNoteAdd from './HandpanNoteAdd.svelte';
	import { HandpanNoteType } from '../classes/_structs';

	let tune: HandpanTune;

	tuneStore.subscribe((value: HandpanTune) => (tune = value || tune));

	function onChange(note: HandpanNote): void {
		console.info('change note', note);
	}
</script>

<h2>Tune</h2>

<h3>Top notes:</h3>

<div class="notes-list">
	<HandpanNoteAdd position={1} type={HandpanNoteType.topNote} />
	{#each tune.topNotes as note, i (note)}
		<HandpanNote bind:note {onChange} />
		<HandpanNoteAdd position={i + 1} type={HandpanNoteType.topNote} />
	{/each}
</div>

<h3>Dings:</h3>
<div class="notes-list">
	<HandpanNoteAdd position={1} type={HandpanNoteType.ding} />
	{#each tune.dings as note, i (note)}
		<HandpanNote bind:note {onChange} />
		<HandpanNoteAdd position={i + 1} type={HandpanNoteType.ding} />
	{/each}
</div>

<h3>Bottom notes:</h3>
<div class="notes-list">
	<HandpanNoteAdd position={1} type={HandpanNoteType.bottomNote} />
	{#each tune.bottomNotes as note, i (note)}
		<HandpanNote bind:note {onChange} />
		<HandpanNoteAdd position={i + 1} type={HandpanNoteType.bottomNote} />
	{/each}
</div>
