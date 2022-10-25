<script>
  // import {
  //   browser as inBrowser,
  // } from '$app/environment';
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    GroupStore,
  } from '$lib/stores/groups.store.js';
  import Footer from '$lib/Footer/index.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const unsubscribeGroupStore = GroupStore.subscribe((newState) => {
    console.log('GroupStore:', newState);
  });

  $: if (data) {
    GroupStore.populate(data?.groups);
  }

  onMount(() => {});

  onDestroy(() => {
    unsubscribeGroupStore();
  });
</script>

<main>
  <slot />
</main>
<Footer />