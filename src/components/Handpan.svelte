<style lang="scss">
    $handpanNoteWidth: 80px;
    $handpanDingRatio: 1.3;

    #handpan {
        position: relative;
        width: 400px;
        height: 400px;
        margin: 10px auto 0 auto;
        display: block;
        border: solid 1px #ddd;
        border-radius: 50%;

        .note {
            font-family: Arial, sans-serif;
            display: inline-block;
            text-align: center;
            border: solid 3px transparent;
            border-radius: 50%;
            position: absolute;
            top: 50%; left: 50%;
            &:hover {
                cursor: pointer;
                border-color: #ccc;
            }
            .note-menu {
                display: none;
            }
        }
    }
</style>

<script lang="ts">
    import NoteInput from "./NoteInput.svelte";
    import MusicNote from "../ts/MusicNote";
    import {Note} from "../ts/Note";
    import {NoteAlteration} from "../ts/NoteAlteration";

    function noteAngle(note: MusicNote, notes: Array<MusicNote>, index: Number): Number
    {
        let number_of_elements = 0;

        for (let el of notes) {
            if (note.ding === el.ding) {
                number_of_elements++;
            }
        }

        const angleOffset = note.ding ? 0 : (note.isTop ? -90 : (notes.length === 2 ? 0 : 135)); // Starts at the bottom side instead of the left.
        const angleIncrementation = 360 / notes.length;

        let angle = 0;
        let i = 0;

        for (const note of notes) {
            if (i && i % 2 === 0) {
                angle *= -1;
            } else {
                angle += (angleIncrementation * i);
            }
            i++;
        }

        return angle + angleOffset;
    }

    function noteStyle(notes: Array<MusicNote>, note: MusicNote, index): void {
        const i = Number(index);
        const numberOfNotes = notes.length;
        const size = 50 + 30 / i;
        const colorHue = note.ding ? 255 : (note.isTop ? 10 : 25);
        const margin = (-4 - (size / 2));
        const color = (Math.floor(30 + 20 * i / numberOfNotes));
        const angle = note.ding
            ? Math.floor((360 / numberOfNotes) * i)
            : noteAngle(note, notes, i);

        return `
            transform: rotate(${angle}deg) translate(-40px) rotate(-${angle}deg);
            background-color: hsl(${colorHue}, 10%, ${color}%);
            height: ${size}px;
            line-height: ${size}px;
            margin: ${margin}px;
            width: ${size}px;
        `;
    }

    export let notes: Array<MusicNote>;

    $: {
        dings = notes.filter((note) => note.ding);
    }
    //$: topNotes = notes.filter((note) => !note.ding && note.isTop);
    //$: bottomNotes = notes.filter((note) => !note.ding && !note.isTop);
</script>

<div>
    <h1>Tune</h1>
    <div id="handpan">
        {#each dings as note, i (note)}
            <div class="note" style="{noteStyle(notes, note, Number(i)+1)}">
                {note.note}
                <div class="note-menu">
                    <ul>
                        <li>
                            <NoteInput {note} />
                        </li>
                    </ul>
                </div>
            </div>
        {/each}
    </div>
</div>
