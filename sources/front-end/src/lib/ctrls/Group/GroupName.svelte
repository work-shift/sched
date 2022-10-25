<script>
  import {
    createEventDispatcher,
  } from 'svelte';
  /**
   * @type {String}
   */
  export let name;
  export let isNameInEditMode = false;
  let editorName = '';

  const dispatch = createEventDispatcher();

  const handleNameChange = () => {
    isNameInEditMode = !dispatch('change', {
      payload: editorName,
    }, {
      cancelable: false,
    });
  }
</script>

<style>
  div {
    display: flex;
    flex: 1 0 100%;
    pointer-events: all;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: start;

    background-color: yellowgreen;
  }

  div > input[type='text'] {
    pointer-events: all;
  }
</style>

<div>
  {#if isNameInEditMode === true}
    <input
      type='text'
      id={crypto.randomUUID()}
      bind:value={editorName}
      on:change={handleNameChange}
    />
  {:else}
    {name}
  {/if}
</div>