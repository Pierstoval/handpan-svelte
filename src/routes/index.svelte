<script lang="ts">
	import Handpan from '../components/Handpan.svelte';
	import Track from '../components/Track.svelte';
	import { onMount } from 'svelte';
	import Player from '../classes/Player';
	import TrackList from '../components/TrackList.svelte';

	onMount(() => {
		Player.loadAudioFiles();
	});
</script>

<div class="container">
	<aside>
		<section>
			<TrackList />
		</section>

		<section>
			<Handpan />
		</section>
	</aside>

	<aside id="track">
		<Track />
	</aside>
</div>

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
