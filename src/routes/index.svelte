<script lang="ts">
    import Handpan from '../components/Handpan.svelte';
    import {tune} from '../stores/tune';
    import HandpanTune from "../classes/HandpanTune";

    let tune_value: HandpanTune;

    tune.subscribe((value: HandpanTune) => {
        tune_value = value;
    });
</script>

<Handpan tune={tune_value}/>
