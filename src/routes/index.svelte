<script lang="ts">
    import Handpan from '../components/Handpan.svelte';
    import Track from '../components/Track.svelte';
    import HandpanTune from "../classes/HandpanTune";
    import {tune} from '../stores/tune';
    import {track} from '../stores/track';
    import {onMount} from "svelte";
    import Player from "../classes/Player";

    let tune_value: HandpanTune;
    let track_value: Track;

    tune.subscribe((value: HandpanTune) => tune_value = value);
    track.subscribe((value: Track) => track_value = value);

    onMount(() => {
        Player.loadSounds();

        if (!track_value.notes.length) {
            track.setDefault(tune_value);
        }
    });

</script>

<style lang="scss">
  .container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
  }
  #track {
    width: 75%;
  }
</style>

<div class="container">

    <section>
        <Handpan tune={tune_value} />
    </section>

    <section id="track">
        <Track track={track_value} tune={tune_value} />
    </section>

</div>
