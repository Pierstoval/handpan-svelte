<script lang="ts">
    import TrackNote from "../classes/TrackNote";
    import HandpanTune from "../classes/HandpanTune";
    import {TrackNoteType} from "../classes/enums";
    import Player from "../classes/Player";

    export let note: TrackNote;
    export let tune: HandpanTune;

    const notes_types: Array<TrackNoteType> = Object.values(TrackNoteType);

    function playNoteOnChange(e: InputEvent): void {
        Player.playNoteByType(note.fullName);
    }

    $: show_notes_menu = note.isNote;
</script>

<style lang="scss">
  .track-note-container {
    position: relative;
    display: inline-block;
    margin: 0 10px;

    &:before,
    &:after {
      content: " ";
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
    &:last-child:after
    {
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

      &.playing {
        border-color: red;
      }

      &.type-none {
        background: transparent;
        border-color: transparent;
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
          font-size: 35px;
          text-shadow: 0 0 3px black;
        }
      }

      &:hover {
        z-index: 2;
        border-color: #e44;
        .track-note-menu {
          visibility: visible;
        }
      }

      .track-note-menu {
        visibility: collapse;
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

<div class="track-note-container" bind:this={note.htmlElement}>
    <div class="track-note type-{note.type}">
        <div class="note-name">
            {note.fullName}
        </div>

        <div class="track-note-menu">

            <div class="track_inputs_container">
                <h3>Type</h3>
                <div class="track_select_container">
                    <select bind:value={note.type} size={notes_types.length}>
                        {#each notes_types as note_type}
                            <option value={note_type}>
                                {note_type}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            {#if show_notes_menu === true}
                <div class="track_inputs_container">
                    <h3>Note</h3>
                    <div class="track_select_container">
                        <select bind:value={note.note} size={tune.notes.length} on:change={playNoteOnChange}>
                            {#each tune.notes as tune_note }
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
