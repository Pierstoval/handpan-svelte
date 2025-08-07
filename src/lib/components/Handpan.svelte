<script lang="ts">
	import { tuneStore } from '$lib/stores/tuneStore';
	import { HandpanNoteType } from '$lib/classes/_structs';
	import HandpanNote from './HandpanNote.svelte';
	import HandpanNoteAdd from './HandpanNoteAdd.svelte';
</script>

<h2>Tune</h2>

<h3>Top notes:</h3>

<div class="notes-list">
	<HandpanNoteAdd position={1} type={HandpanNoteType.topNote} />
	{#each $tuneStore.topNotes as topNote, i (topNote)}
		<HandpanNote bind:note={topNote} />
		<HandpanNoteAdd position={i + 1} type={HandpanNoteType.topNote} />
	{/each}
</div>

<h3>Dings:</h3>
<div class="notes-list">
	<HandpanNoteAdd position={1} type={HandpanNoteType.ding} />
	{#each $tuneStore.dings as dingNote, i (dingNote)}
		<HandpanNote bind:note={dingNote} />
		<HandpanNoteAdd position={i + 1} type={HandpanNoteType.ding} />
	{/each}
</div>

<h3>Bottom notes:</h3>
<div class="notes-list">
	<HandpanNoteAdd position={1} type={HandpanNoteType.bottomNote} />
	{#each $tuneStore.bottomNotes as note, i (note)}
		<HandpanNote bind:note />
		<HandpanNoteAdd position={i + 1} type={HandpanNoteType.bottomNote} />
	{/each}
</div>
