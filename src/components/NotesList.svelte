<script lang="ts">
    import NoteInput from "./NoteInput.svelte";
    import {Note} from "../classes/enums";

    export let notes: Note[];
</script>

<style lang="scss">
    .note {
        font-family: Arial, sans-serif;
        display: inline-block;
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
        .note-menu {
            display: none;
        }
    }
</style>

<div class="notes-list">
    {#if notes && notes.length}
        {#each notes as note, i (note)}
            <div class="note">
                {note.fullName}
                <div class="note-menu">
                    <ul>
                        <li>
                            <NoteInput {note} />
                        </li>
                    </ul>
                </div>
            </div>
        {/each}
    {:else}
        None
    {/if}
</div>
