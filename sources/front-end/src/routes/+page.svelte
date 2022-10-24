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

  onMount(() => {});

  onDestroy(() => {
    unsubscribeGroupStore();
  });
</script>

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: 1vh;
  }
</style>

<ul>
  {#each groups as groupInfo}
    <Group {groupInfo} />
  {/each}
</ul>
