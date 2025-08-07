<script lang="ts">
	const props = $props();
</script>

<button {...props}>
	{@render props.children?.()}
</button>

<style>
	button {
		width: 40px;
		height: 40px;
		margin: 5px auto;
		font-size: 25px;
		text-align: center;
		line-height: 20px;

		color: #fff;
		border: solid 2px #666;
		background-color: #666;

		cursor: pointer;

		&:hover {
			color: #eee;
			border: solid 2px #888;
			background-color: #888;
		}

		&:active {
			color: #ddd;
			border: solid 2px #aaa;
			background-color: #aaa;
		}
	}
</style>
