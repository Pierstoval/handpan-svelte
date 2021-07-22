<script lang="ts">
    import {Note, NoteAlteration} from "../classes/enums";
    import HandpanNote from "../classes/HandpanNote";

    export let note: HandpanNote;

    let show_menu = false;

    const notes: Array<Note> = Object.values(Note);
    const available_octaves = [1, 2, 3, 4, 5];
    const available_alterations = Object.values(NoteAlteration);

    function toggleMenu() {
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
      border-radius: 25px;
      width: 50px;
      height: 50px;
      background: #eee;
      border: 3px solid #ddd;
      line-height: 47px; // width or height minus border
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
      z-index: 10;
      width: 290px;
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
        margin: -2px -14px -2px -2px;

        option {
          min-width: 50px;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    }
  }
</style>

<div class="note-container">
    <div class="note" on:click={toggleMenu}>
        {note.fullName}
    </div>
    <div class="note-menu {show_menu?'active':''}">

        <div class="inputs_container">
            <h3>Note</h3>
            <div class="select_container">
                <select bind:value={note.note} size={notes.length}>
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
                <select bind:value={note.octave} size={available_octaves.length}>
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
                <select bind:value={note.alteration} size={available_alterations.length}>
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