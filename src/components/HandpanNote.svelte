<script lang="ts">
	import { Note, NoteAlteration } from '../classes/_structs';
	import HandpanNote from '../classes/HandpanNote';
	import Player from '../classes/Player';
	import { onMount } from 'svelte';

	export let note: HandpanNote;
	export let onChange;

	let show_menu = false;

	const notes: Array<Note> = Object.values(Note);
	const available_octaves = [1, 2, 3, 4, 5];
	const available_alterations: Array<NoteAlteration> = Object.values(NoteAlteration);

	function onNoteValueChange(): void {
		if (onChange) {
			onChange(note);
		}
		Player.playNoteByType(note.fullName);
	}

	onMount(() => note.refreshHtmlElement());
</script>

<div class="note-container" data-handpan-note={note.fullName} bind:this={note.htmlElement}>
	<div class="note {note.isPlaying ? 'playing' : ''}">
		<div class="note-name">
			{note.fullName}
		</div>
		<div class="note-menu {show_menu ? 'active' : ''}">
			<div class="inputs_container">
				<h3>Note</h3>
				<div class="select_container">
					<select bind:value={note.note} size={notes.length} on:change={onNoteValueChange}>
						{#each notes as note_name}
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
						{#each available_octaves as note_octave}
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
						{#each available_alterations as note_octave}
							<option value={note_octave}>
								{note_octave}
							</option>
						{/each}
					</select>
				</div>
			</div>

			<div>
				<h4>Info</h4>
				<ul>
					<li>Midi: {note.midiNumber}</li>
				</ul>
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
					border: solid grey 1px;

					select {
						margin: -2px -14px -15px -2px;

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
