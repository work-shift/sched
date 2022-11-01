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
  import WeekGrid from './WeekGrid.svelte';

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
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'group-name week-grid'
    ;
    width: 100%;
    min-height: var(--group-height);
    height: var(--group-height);

    background-color: var(--theme-gray);

    padding: max(0.5vh, 0.5vw);

    pointer-events: all;
  }

  .group-name {
    grid-area: group-name;
    display: flex;
    justify-content: start;
    align-items: center;
  }
</style>

<!-- use:doubletap on:doubletap={handleNameDoubleClick} -->
<!-- <GroupName
  name={groupInfo.name}
  {isNameInEditMode}
  on:change={handleNameChange}
/> -->
<li id={groupInfo.id} class:isVirtual class='name'>
  <section class='group-name'>{groupInfo.name}</section>
  <WeekGrid />
</li>