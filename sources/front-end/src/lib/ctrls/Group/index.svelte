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
    display: flex;
    width: 100%;
    min-height: var(--group-height);
    height: var(--group-height);

    background-color: var(--theme-gray);

    padding: max(0.5vh, 0.5vw);

    pointer-events: all;
  }

  .isVirtual {
    border-color: var(--theme-darkest_white);
  }

  .name {
    pointer-events: all;
    display: flex;
    align-items: stretch;
    width: 100%;
  }
</style>

<li id={groupInfo.id} class:isVirtual class='name' use:doubletap on:doubletap={handleNameDoubleClick}>
  <GroupName
    name={groupInfo.name}
    {isNameInEditMode}
    on:change={handleNameChange}
  />
</li>