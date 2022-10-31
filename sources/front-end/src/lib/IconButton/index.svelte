<script>
  import {
    createEventDispatcher,
  } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('click');
  };
</script>

<style>
  button {
    height: var(--main-button-height);
    aspect-ratio: 1 / 1;
    pointer-events: all;
    /* border-radius: 50%; */
  }
</style>

<button on:click={handleClick}>
  <slot></slot>
</button>