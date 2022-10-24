<script>
  import TrashIcon from "$lib/icons/TrashIcon.svelte";
  import IconButton from '$lib/IconButton/index.svelte';

  /** @type {Array<String>} */
  export let groupInfo;

  let isVirtual = true;
  /** @type {Object} */

  $: if (groupInfo) {
    isVirtual = false;
  }
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
    height: 10vh;

    border: 1px dashed transparent;
    border-radius: max(0.25vh, 0.25vw);
    
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
      <IconButton>
        <TrashIcon color='red' />
      </IconButton>
    {/if}
  </div>
</li>