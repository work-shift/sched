<script>
  import {
    browser as inBrowser,
  } from '$app/environment';
  import {
    onMount,
    onDestroy,
  } from 'svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  onMount(() => {
    if (inBrowser === true) {}
  });

  onDestroy(() => {
    if (inBrowser === true) {}

  });
</script>

<style>
</style>

<header>header</header>
<section id='left'>
</section>
<main>
  <slot />
</main>
<section id='right'>right</section>
<footer>footer</footer>