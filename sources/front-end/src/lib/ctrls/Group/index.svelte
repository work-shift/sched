<script>
  import {
    createEventDispatcher,
  } from 'svelte';
  import TrashIcon from "$lib/icons/TrashIcon.svelte";
  import IconButton from '$lib/IconButton/index.svelte';

  const dispatch = createEventDispatcher();

  /** @type {Array<String>} */
  export let groupInfo;

  let isVirtual = true;
  /** @type {Object} */

  $: if (groupInfo) {
    isVirtual = false;
  }

  const handleClick = () => {
    dispatch('click');
  };
</script>

<style>
  li {
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'name ctrls'
    ;

    width: 100%;
    min-height: var(--group-height);
    height: var(--group-height);

    border: 1px dashed transparent;
    border-radius: var(--main-border-radius);
    
    background-color: var(--theme-gray);

    padding: max(0.5vh, 0.5vw);

    pointer-events: all;
  }

  li > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }
  
  .isVirtual {
    border-color: var(--theme-darkest_white);
  }

  .name {
    grid-area: name;
  }

  .ctrls {
    grid-area: ctrls;
    justify-content: center;
    align-items: center;
  }
</style>

<li id={groupInfo.id} class:isVirtual>
  <div class='name'>
    {#if isVirtual === false}
      {groupInfo.name}
    {:else}
      &nbsp;
    {/if}
  </div>
  <div class='ctrls'>
    {#if isVirtual === false}
      <IconButton on:click={handleClick}>
        <TrashIcon color='var(--theme-icon-svg-color)' />
      </IconButton>
    {/if}
  </div>
</li>