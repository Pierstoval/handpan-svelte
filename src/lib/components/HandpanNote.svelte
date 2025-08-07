<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';

	import { Note, NoteAlteration } from '$lib/classes/_structs';
	import HandpanNote from '$lib/classes/HandpanNote';
	import Player from '$lib/classes/Player';

	import { tuneStore } from '$lib/stores/tuneStore';
	import ActionButton from '$lib/components/ActionButton.svelte';

	export let note: HandpanNote;
	export let onChange: null | ((note: HandpanNote) => void) = null;

	let show_menu = false;

	const notes: Array<Note> = Object.values(Note);
	const available_octaves = [1, 2, 3, 4, 5];
	const available_alterations: Array<NoteAlteration> = Object.values(NoteAlteration);

	function onNoteValueChange(): void {
		note.refresh();
		if (onChange) {
			onChange(note);
		}
		Player.playNoteByType(note.fullName);
		tuneStore.set($tuneStore.clone());
	}

	function removeNote(note: HandpanNote): void {
		const tune = $tuneStore;
		tune.removeNote(note);
		tuneStore.set(tune.clone());
	}

	onMount(() => note.refreshHtmlElement());
	afterUpdate(() => note.refreshHtmlElement());
</script>

<div class="note-container" data-handpan-note={note.fullName}>
	<div class="note {note.isPlaying ? 'playing' : ''}">
		<div class="note-name">
			{note.fullName}
		</div>
		<div class="note-menu {show_menu ? 'active' : ''}">
			<div>
				<ActionButton onclick={() => Player.playNoteByType(note.fullName)}>🔊</ActionButton>
				<ActionButton onclick={() => removeNote(note)}>🗑</ActionButton>
			</div>

			<div class="inputs_container">
				<h3>Note</h3>
				<div class="select_container">
					<select bind:value={note.note} size={notes.length} on:change={onNoteValueChange}>
						{#each notes as note_name (note_name)}
							<option value={note_name}>
								{note_name}
							</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="inputs_container">
				<h3>Octave</h3>
				<div class="select_container">
					<select
						bind:value={note.octave}
						size={available_octaves.length}
						on:change={onNoteValueChange}
					>
						{#each available_octaves as note_octave (note_octave)}
							<option value={note_octave}>
								{note_octave}
							</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="inputs_container">
				<h3>Alteration</h3>
				<div class="select_container">
					<select
						bind:value={note.alteration}
						size={available_alterations.length}
						on:change={onNoteValueChange}
					>
						{#each available_alterations as note_octave (note_octave)}
							<option value={note_octave}>
								{note_octave}
							</option>
						{:else}
							<option>What?</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.note-container {
		position: relative;
		display: inline-block;
		margin: 3px;
		color: #222;

		.note {
			font-family: Arial, sans-serif;
			position: relative;
			z-index: 1;
			margin: 0;
			padding: 0;
			text-align: center;
			border-radius: 50%;
			width: 50px;
			height: 50px;
			background: #eee;
			border: 3px solid #ccd;
			line-height: 47px;

			&.playing {
				border-color: red;
			}

			.note-name {
				user-select: none;
			}

			&:hover {
				z-index: 2;
				border-color: #666;
				.note-menu {
					visibility: visible;
				}
			}

			.note-menu {
				visibility: collapse;
				width: 300px;
				position: absolute;
				z-index: 20;
				border: solid 2px #ccc;
				border-radius: 5px;
				padding: 5px 20px 20px 20px;
				background: #eee;

				.inputs_container {
					display: inline-block;
					text-align: center;
				}

				.select_container {
					display: inline-block;
					vertical-align: top;
					overflow: hidden;

					select {
						overflow-y: auto;

						option {
							min-width: 50px;
							padding-left: 5px;
							padding-right: 5px;
						}
					}
				}
			}
		}
	}
</style>
