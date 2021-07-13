<script lang="ts">
    import {onMount} from "svelte";
    import {Note, NoteAlteration} from "../classes/enums";

    export let note;

    let show_menu = false;
    const notes: Array<Note> = Object.values(Note);
    const available_octaves = [1, 2, 3, 4, 5];
    const available_alterations = Object.values(NoteAlteration);

    onMount(() => {
        document.addEventListener('click', function(e: HTMLEvent) {
            if (e.target.closest('.note') || e.target.closest('.note-menu')) {
                return;
            }
            show_menu = false;
        });
    });

    function showMenu() {
        show_menu = !show_menu;
    }
</script>

<style lang="scss">
    .note-container {
        position: relative;
        display: inline-block;
        .note {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background: #eee;
            border: 3px solid #ddd;
            line-height:50px;
            &:hover {
                cursor: pointer;
                background: #ddd;
                border-color: #ccc;
            }
            &:focus, &:active {
                background: #ccc;
                border-color: #bbb;
            }
        }

        .note-menu {
            display: none;
            position: absolute;
            z-index: 1;
            width: 210px;
            border: solid 2px #ccc;
            border-radius: 5px;
            padding: 20px;
            background: #eee;
            &.active {
                display: block;
            }
        }

        h3 {
            padding: 0;
            margin: 0;
        }

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
                margin: -5px -20px -5px -5px;
                option {
                    min-width: 50px;
                }
            }
        }
    }
</style>

<div class="note-container">
    <div class="note" on:click={showMenu}>
        {note.fullName}
    </div>
    <div class="note-menu {show_menu?'active':''}">

        <div class="inputs_container">
            <h3>Note</h3>
            <div class="select_container">
                <select name="note_name" id="note_name" bind:value={note.note} size={notes.length}>
                    {#each notes as note_name }
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
                <select name="note_octave" id="note_octave" bind:value={note.octave} size={available_octaves.length}>
                    {#each available_octaves as note_octave }
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
                <select name="note_alteration" id="note_alteration" bind:value={note.alteration} size={available_alterations.length}>
                    {#each available_alterations as note_octave }
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