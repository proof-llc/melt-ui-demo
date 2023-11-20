<script lang="ts">
	import { usePortal } from "./portal";
	let test1 = '';
	let test2 = '';
</script>

<button on:click={() => (test1 = 'works!')}>OUTSIDE PORTAL </button>
<p>{test1}</p>

<br />

<div use:usePortal>
	<button on:click={() => (test2 = 'works!')}>INSIDE PORTAL </button>
	<p>{test2}</p>
</div>
