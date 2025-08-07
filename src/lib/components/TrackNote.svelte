<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';

	import TrackNote from '$lib/classes/TrackNote';
	import { TrackNoteType } from '$lib/classes/_structs';
	import Player from '$lib/classes/Player';

	import { trackStore } from '$lib/stores/trackStore';
	import { tuneStore } from '$lib/stores/tuneStore';
	import ActionButton from '$lib/components/ActionButton.svelte';

	export let trackNote: TrackNote;

	const notes_types: Array<TrackNoteType> = Object.values(TrackNoteType);

	trackStore.subscribe((value) => {
		if (value && trackNote) {
			trackNote.refreshHtmlElement();
		}
	});

	function playNoteOnChange(): void {
		trackNote.refresh();
		Player.playNote(trackNote);
	}

	function removeNote(note: TrackNote): void {
		const track = $trackStore;
		track.removeNote(note);
		trackStore.set(track.clone());
	}

	onMount(() => trackNote.refreshHtmlElement());
	afterUpdate(() => trackNote.refreshHtmlElement());
</script>

<div class="track-note-container" data-track-note={trackNote.id}>
	<div class="track-note type-{trackNote.type}">
		<div class="note-name">
			{trackNote.baseName}
		</div>

		<div class="track-note-menu">
			<div>
				{#if !trackNote.isNone}
					<ActionButton onclick={() => Player.playNote(trackNote)}>🔊</ActionButton>
				{/if}
				<ActionButton onclick={() => removeNote(trackNote)}>🗑</ActionButton>
			</div>

			<div class="track_inputs_container">
				<h3>Type</h3>
				<div class="track_select_container">
					<select bind:value={trackNote.type} size={notes_types.length}>
						{#each notes_types as note_type (note_type)}
							<option value={note_type}>
								{note_type}
							</option>
						{/each}
					</select>
				</div>
			</div>

			{#if trackNote && $tuneStore && trackNote.isNote}
				<div class="track_inputs_container">
					<h3>Note</h3>
					<div class="track_select_container">
						<select
							bind:value={trackNote.note}
							size={$tuneStore.numberOfNotes}
							on:change={playNoteOnChange}
						>
							{#each $tuneStore.notes as tune_note (tune_note.id)}
								<option value={tune_note}>
									{tune_note.fullDetailedName}
								</option>
							{/each}
						</select>
					</div>
				</div>
			{/if}
		</div>
	</div>
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
		&:first-child:before,
		&:last-child:after {
			display: none;
		}

		.track-note {
			font-family: Arial, sans-serif;
			position: relative;
			z-index: 1;
			margin: 0;
			padding: 0;
			text-align: center;
			border-radius: 50%;
			width: 50px;
			height: 50px;
			background: #dde;
			border: 3px solid #ccd;
			line-height: 47px; // width or height minus border

			.note-name {
				user-select: none;
			}

			&.playing {
				border-color: red;
			}

			&.type-none {
				color: transparent;
				.note-name {
					line-height: 44px;
					font-size: 20px;
				}
			}

			&.type-slap,
			&.type-ghost {
				.note-name {
					font-size: 35px;
				}
			}

			&.type-slap {
				background-color: #ded;
			}

			&.type-ghost {
				background-color: #eee;
				.note-name {
					font-size: 18px;
					text-shadow: 0 0 2px #444;
				}
			}

			&:hover {
				z-index: 2;
				border-color: #e44;
				.track-note-menu {
					visibility: visible;
					display: block;
				}
			}

			.track-note-menu {
				visibility: collapse;
				display: none;
				width: 220px;
				position: absolute;
				z-index: 20;
				border: solid 2px #ccc;
				border-radius: 5px;
				padding: 5px 20px 20px 20px;
				background: #eee;

				.track_inputs_container {
					display: inline-block;
					text-align: center;
				}

				.track_select_container {
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
