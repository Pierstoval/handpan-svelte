<script lang="ts">
	import Handpan from './components/Handpan.svelte';
	import MusicNote from "./ts/MusicNote";
	import {Note} from "./ts/Note";
	import {NoteAlteration} from "./ts/NoteAlteration";

	export let notes: Array<MusicNote> = [
		new MusicNote(Note.C, NoteAlteration.sharp, 3, true, 0),
		new MusicNote(Note.G, NoteAlteration.none, 3, false, 0),
		new MusicNote(Note.A, NoteAlteration.none, 4, false, 1),
		new MusicNote(Note.B, NoteAlteration.none, 4, false, 2),
		new MusicNote(Note.C, NoteAlteration.sharp, 4, false, 3),
		new MusicNote(Note.D, NoteAlteration.sharp, 4, false, 4),
		new MusicNote(Note.E, NoteAlteration.none, 4, false, 5),
		new MusicNote(Note.F, NoteAlteration.sharp, 4, false, 6),
		new MusicNote(Note.G, NoteAlteration.sharp, 4, false, 7),
	];
</script>

<style lang="scss">
	body {
		background-color: #333;
		color: #ddd;
		font-family: Arial, sans-serif;
	}
</style>

<body>
Test.

<Handpan tune={notes}/>
</body>
