<script>
  import {
    createEventDispatcher,
  } from 'svelte';
  import TrashIcon from "$lib/icons/TrashIcon.svelte";
  import IconButton from '$lib/IconButton/index.svelte';
  import GroupName from '$lib/ctrls/Group/GroupName.svelte';
  import {
    doubletap,
  } from '$lib/usages/doubletap';

  const dispatch = createEventDispatcher();

  /** @type {Array<String>} */
  export let groupInfo;

  let isNameInEditMode = false;

  let isVirtual = true;

  /** @type {Object} */
  $: if (groupInfo) {
    isVirtual = false;
  }

  const handleDeleteClick = () => {
    dispatch('click');
  };

  const handleNameDoubleClick = (event) => {
    isNameInEditMode = true;
  };

  const handleNameChange = (/** @type {CustomEvent} */ event) => {
    const {
      detail: {
        payload,
      },
    } = event;

    dispatch('nameChanged', {
      payload,
    });
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
    pointer-events: all;
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 100%;

    background-color: brown;
  }

  .ctrls {
    grid-area: ctrls;
    justify-content: center;
    align-items: center;
  }
</style>

<li id={groupInfo.id} class:isVirtual>
  <div class='name' use:doubletap on:doubletap={handleNameDoubleClick}>
    <GroupName
      name={groupInfo.name}
      {isNameInEditMode}
      on:change={handleNameChange}
    />
  </div>
  <div class='ctrls'>
    {#if isVirtual === false}
      <IconButton on:click={handleDeleteClick}>
        <TrashIcon color='var(--theme-icon-svg-color)' />
      </IconButton>
    {/if}
  </div>
</li>