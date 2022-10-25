<script>
  import {
    GroupStore,
  } from '$lib/stores/groups.store';
  import IconButton from '$lib/IconButton/index.svelte';
  import PlusIcon from '$lib/icons/PlusIcon.svelte';

  const handleClick = () => {
    GroupStore.addGroup();
  };
</script>

<style>
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* :global(footer > button) {
    transform: translateY(calc(-1 * var(--main-button-height) / 2));
  } */
</style>

<footer>
  <IconButton on:click={handleClick}>
    <PlusIcon size=24 color='var(--theme-icon-svg-color)' />
  </IconButton>
</footer>