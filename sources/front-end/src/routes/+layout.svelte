<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    GroupStore,
  } from '$lib/stores/groups.store.js';
  import Footer from '$lib/Footer/index.svelte';

  const unsubscribeGroupStore = GroupStore.subscribe((newState) => {
    console.log('GroupStore:', newState);
  });

  onMount(() => {});

  onDestroy(() => {
    unsubscribeGroupStore();
  });
</script>

<main>
  <slot />
</main>
<Footer />