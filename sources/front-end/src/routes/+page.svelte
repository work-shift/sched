<script>
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import Group from '$lib/ctrls/Group/index.svelte';
  import {
    GroupStore,
  } from '$lib/stores/groups.store.js';

  /** @type {Array<Object>} */
  let groups = [];
  const unsubscribeGroupStore = GroupStore.subscribe((newState) => {
    groups = Array
      .from(newState)
      .map(([id, groupInfo]) => {
        return ({
          ...{id},
          ...groupInfo,
        })
      })
      .sort((a, b) => a.createdTs - b.createdTs);
  });

  const handleDeleteGroup = (groupId) => {
    GroupStore.removeGroup(groupId);
  };

  onMount(() => {});

  onDestroy(() => {
    unsubscribeGroupStore();
  });
</script>

<style>
  ul {
    display: flex;
    flex: 1 0 100%;
    flex-direction: column;
    gap: 1vh;

    overflow-y:scroll;

    pointer-events: all;
  }
</style>

<ul>
  {#each groups as groupInfo}
    <Group
      {groupInfo}
      on:click={() => handleDeleteGroup(groupInfo.id)}
    />
  {/each}
</ul>
