<script lang="ts">
	import { onMount } from 'svelte';
	import Handpan from '$lib/components/Handpan.svelte';
	import Track from '$lib/components/Track.svelte';
	import Player from '$lib/classes/Player';
	import TrackList from '$lib/components/TrackList.svelte';

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
