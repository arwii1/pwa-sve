<script lang="ts">
	interface BreadcrumbItem {
		label: string;
		href: string;
	}

	interface Props {
		items?: BreadcrumbItem[];
	}

	let { items = [] }: Props = $props();

	const defaultItems: BreadcrumbItem[] = [
		{ label: 'Главная', href: '/' }
	];

	let breadcrumbs = $derived([...defaultItems, ...items]);
</script>

<nav class="mb-8" aria-label="Breadcrumb">
	<ol class="flex space-x-2 text-sm text-gray-600">
		{#each breadcrumbs as item, index}
			<li class="flex items-center">
				{#if index > 0}
					<span class="mx-2 text-gray-400">/</span>
				{/if}
				{#if index === breadcrumbs.length - 1}
					<span class="text-gray-800 font-medium">{item.label}</span>
				{:else}
					<a href={item.href} class="text-blue-600 hover:text-blue-800 transition-colors">
						{item.label}
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
</style>
