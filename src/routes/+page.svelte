<script lang="ts">
	import { createToaster, melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import type { MouseEventHandler } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	// import { X } from 'lucide-svelte';

	type ToastData = {
		title: string;
		description: string;
		color: string;
		action: MouseEventHandler<HTMLButtonElement>;
	};

	const {
		elements: { content, title, description, close },
		helpers: { addToast },
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	const toastData: ToastData[] = [
		{
			title: 'Success',
			description: 'Congratulations! It worked!',
			color: 'bg-green-500',
			action: () => alert('test')
		},
		{
			title: 'Warning',
			description: 'Please check again.',
			color: 'bg-orange-500',
			action: () => alert('test')
		},
		{
			title: 'Error',
			description: 'Something did not work!',
			color: 'bg-red-500',
			action: () => alert('test')
		}
	];

	function addRandomToast() {
		addToast({
			data: toastData[Math.floor(Math.random() * toastData.length)]
		});
	}
</script>

<button
	class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3
    font-medium leading-none text-magnum-700 shadow hover:opacity-75"
	on:click={addRandomToast}
>
	Show toast
</button>

<div
	class="fixed right-0 top-0 z-50 m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
	use:portal
>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="rounded-lg bg-neutral-800 text-white shadow-md"
		>
			<div
				class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
			>
				<div>
					<h3 use:melt={$title(id)} class="flex items-center gap-2 font-semibold">
						{data.title}
						<span class="rounded-full square-1.5 {data.color}" />
					</h3>
					<div use:melt={$description(id)}>
						{data.description}
					</div>
					<button
						id="action"
						on:click={data.action}
						class="dark:bg-magnum-900 dark:text-magnum-100 dark:hover:bg-magnum-800 hover:bg-magnum-200 cursor-pointer inline-flex h-8 items-center justify-center rounded-[4px] bg-magnum-100 px-4 font-medium leading-none text-magnum-900 focus:outline-none focus:ring-2 focus:ring-magnum-400 transition-all duration-300 ease-in-out"
						>TEST
					</button>
				</div>
				<button
					use:melt={$close(id)}
					class="absolute right-4 top-4 grid place-items-center rounded-full text-magnum-500 square-6
            hover:bg-magnum-900/50"
				>
					<!-- <X class="square-4" /> -->
					C
				</button>
			</div>
		</div>
	{/each}
</div>
