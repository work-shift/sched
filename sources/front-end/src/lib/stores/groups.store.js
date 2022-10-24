import {
  writable,
} from 'svelte/store';

const STORE = new Map();

function createGroupStore() {
  const {
    subscribe,
    update,
  } = writable(STORE);

  return {
    subscribe,
    populate: (groups) => update((currentState) => {
      for (const { id, createdTs, name } of groups) {
        currentState.set(id, {
          createdTs,
          name,
        });
      }

      return currentState;
    }),
  }
}

export const GroupStore = createGroupStore();